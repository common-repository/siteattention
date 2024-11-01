<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              siteattention.com
 * @since             2.0.0
 * @package           SiteAttention
 *
 * @wordpress-plugin
 * Plugin Name:       SiteAttention
 * Description:       Simple and intuitive SEO tool to help improve seach ranking.
 * Version:           3.0.7
 * Author:            siteattention
 * Author URI:        https://siteattention.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       SiteAttention
 * Domain Path:       /languages
 */

define('SITEATTENTION_API_URL', 'https://rest.siteattention.com/api');
define('SITEATTENTION_DASH_URL', 'https://app.siteattention.com');
define('SITEATTENTION_PL_URL', rtrim(plugin_dir_url(__FILE__), '/'));
define('SITEATTENTION_THRESHOLD', 70);
define('SITEATTENTION_RENEW_URL', 'https://siteattention.com/products/getsiteattention');

function siteattention_settings_init() {
	// register a new setting for "siteattention" page
	register_setting( 'siteattention', 'siteattention_options', 'siteattention_validate_inputs');

	// register a new field in the "siteattention_section_license" section, inside the "siteattention" page
	add_settings_field(
		'license_key',
		// use $args' label_for to populate the id inside the callback
		__( 'License key *', 'siteattention' ),
		'siteattention_license_key_cb',
		'siteattention',
		'siteattention_section_license',
		[
			'label_for' => 'license_key',
			'class' => 'siteattention_row',
		]
	);

	add_settings_field(
		'iname',
		// use $args' label_for to populate the id inside the callback
		__( 'Instance Name', 'siteattention' ),
		'siteattention_iname_cb',
		'siteattention',
		'siteattention_section_license',
		[
			'label_for' => 'iname',
			'class' => 'siteattention_row',
		]
	);
	// ------ New Form Section here ------ //

	// register a new field in the "siteattention_section_register" section, inside the "siteattention" page
	add_settings_field(
		'firstname',
		// use $args' label_for to populate the id inside the callback
		__( 'Your first name', 'siteattention' ),
		'siteattention_firstname_cb',
		'siteattention',
		'siteattention_section_register',
		[
			'label_for' => 'firstname',
			'class' => 'siteattention_row',
		]
	);

	// register a new field in the "siteattention_section_register" section, inside the "siteattention" page
	add_settings_field(
		'email',
		// use $args' label_for to populate the id inside the callback
		__( 'Your e-mail address', 'siteattention' ),
		'siteattention_email_cb',
		'siteattention',
		'siteattention_section_register',
		[
			'label_for' => 'email',
			'class' => 'siteattention_row',
		]
	);

    if(!siteattention_registered()) {
	// register a new section for the customer registration in the "siteattention" page
	add_settings_section(
		'siteattention_section_register',
		__( 'New customer', 'siteattention' ),
		'siteattention_section_register_cb',
		'siteattention'
	);
	}

	// register a new section for the license settings in the "siteattention" page
	add_settings_section(
		'siteattention_section_license',
		__( 'Existing customer', 'siteattention' ),
		'siteattention_section_license_cb',
		'siteattention'
	);
}

function siteattention_registered() {
	return (!empty(siteattention_get_acccount_info()['token']));
}

function siteattention_show_license() {
	return (!empty(siteattention_get_option('firstname','')) && !empty(siteattention_get_option('email','')));
}

function siteattention_validate_inputs( $input ) {
	// Create our array for storing the validated options
	$output = array();

	// Loop through each of the incoming options
	foreach( $input as $key => $value ) {
		// Check to see if the current option has a value. If so, process it.
		if( isset( $input[$key] ) ) {

			// Strip all HTML and PHP tags and properly handle quoted strings
			$output[$key] = strip_tags( stripslashes( $input[ $key ] ) );

		} // end if

	} // end foreach

	// Return the array processing any additional functions filtered by this action
	return apply_filters( 'siteattention_validate_inputs', $output, $input );

}

/**
 * register our siteattention_settings_init to the admin_init action hook
 */
add_action( 'admin_init', 'siteattention_settings_init' );

/**
 * custom option and settings:
 * callback functions
 */

// developers section cb

// section callbacks can accept an $args parameter, which is an array.
// $args have the following keys defined: title, id, callback.
// the values are defined at the add_settings_section() function.
function siteattention_section_license_cb( $args ) {
	?>
    <p><?php echo __('Fields marked with \'*\' are required') ;?></p>
    <p><?php echo __( 'The <b>Instance Name</b> used for reference when using SiteAttention Dashboard.' ); ?></p>
    <p><?php echo __( '<a href="' . SITEATTENTION_DASH_URL . '" target="_blank">Go to your Dashboard now</a> and check your pages\' SEO performance.');?></p>
	<?php
}

function siteattention_section_register_cb( $args ) {
	?>
	<?php if (siteattention_registered()) { ?>
        <p style="font-weight:900;font-size:14px;"><?php esc_html_e( 'You\'re already signed up.  If you need to signup with a different \'first name\' and/or e-mail, then clear this form data by pressing \'Clear form\' ', 'siteattention' ); ?></p>
	<?php } ?>
    <p id="<?php echo esc_attr( $args['id'] ); ?>"><?php esc_html_e('Sign up to SiteAttention - We will only ask for your first name and e-mail address.', 'siteattention' ); ?></p>
    <p><?php esc_html_e('Not quite ready to register?', 'siteattention' ); ?></p>
    <p><a href="https://landing.siteattention.com/hi" target="_blank">Get to know SiteAttention!</a></p>
    <p><a href="https://siteattention.com/pages/seo-plugin-wordpress" target="_blank">Installation guide</a></p>
	<?php
}

function siteattention_get_option($option_key, $default_value = '') {
	$all_option_values = get_option( 'siteattention_options' );
	return (!empty($all_option_values[$option_key])) ? $all_option_values[$option_key] : $default_value;
}

function siteattention_set_option($option_key, $value = '') {
	$all_option_values = get_option( 'siteattention_options' );
	$all_option_values[$option_key] = $value;
	update_option('siteattention_options', $all_option_values);
}

function siteattention_get_iids($license_key) {
	$rs_list = array();
	if(!empty($license_key)) {
		$rs_list = array('TcJGali4iC');
	}

	return $rs_list;
}

// pill field cb

// field callbacks can accept an $args parameter, which is an array.
// $args is defined at the add_settings_field() function.
// wordpress has magic interaction with the following keys: label_for, class.
// the "label_for" key value is used for the "for" attribute of the <label>.
// the "class" key value is used for the "class" attribute of the <tr> containing the field.
// you can add custom key value pairs to be used inside your callbacks.
function siteattention_license_key_cb( $args ) {
	// get the value of the setting we've registered with register_setting()
	$license_key_value = siteattention_get_option( 'license_key' );

	// output the field
	?>
    <input type="text" name="siteattention_options[<?php echo esc_attr( $args['label_for'] ); ?>]" id="<?php echo esc_attr( $args['label_for'] ); ?>" size="30" value="<?php echo sanitize_text_field($license_key_value) ;?>"/><br/><br/><input type="button" id="siteattention_license_key_get_info" value="Auto-fill from license key">
    </div>
	<?php
}

function siteattention_iid_cb( $args ) {
	$license_key_value = siteattention_get_option( 'license_key' );
	// get the value of the setting we've registered with register_setting()
	$iid_from_reg = (!empty(siteattention_get_acccount_info()['settings']['iid'])) ? siteattention_get_acccount_info()['settings']['iid'] : '';
	$iid_value = siteattention_get_option( 'iid', $iid_from_reg);
	$iid_account_values = array();
	if($license_key_value) {
		$iid_account_values = siteattention_get_iids($license_key_value);
	}

	// output the field
	?>
	<?php if((count($iid_account_values) > 1)) { ?>
        <select name="siteattention_options[<?php echo esc_attr( $args['label_for'] ); ?>]" id="<?php echo esc_attr( $args['label_for'] ); ?>">
			<?php foreach($iid_account_values as $iid) { ?>
                <option value="<?php echo $iid;?>" <?php echo ($iid === $iid_value) ? 'selected="selected"' : '';?>><?php echo $iid ;?></option>
			<?php } ?>
        </select>
	<?php }
	else { ?>
        <input type="text" name="siteattention_options[<?php echo esc_attr( $args['label_for'] ); ?>]" id="<?php echo esc_attr( $args['label_for'] ); ?>" size="30" value="<?php echo sanitize_text_field($iid_value) ;?>" />
	<?php } ?>
	<?php
}

function siteattention_firstname_cb( $args ) {
    // get the value of the setting we've registered with register_setting()
	$firstname_from_reg = (!empty(siteattention_get_acccount_info()['name'])) ? siteattention_get_acccount_info()['name'] : '';
	$firstname_value = siteattention_get_option( 'firstname', $firstname_from_reg);
	$disabled = (siteattention_registered()) ? 'disabled="disabled"' : '';
	$disabled = '';
	// output the field
	?>
    <input type="text" name="siteattention_options[<?php echo esc_attr( $args['label_for'] ); ?>]" id="<?php echo esc_attr( $args['label_for'] ); ?>" size="30" value="<?php echo sanitize_text_field($firstname_value) ;?>" <?php echo $disabled;?>/>
	<?php
}

function siteattention_email_resend_cb( $args ) {
	// get the value of the setting we've registered with register_setting()
	$email_from_reg = (!empty(siteattention_get_acccount_info()['customer']['email'])) ? siteattention_get_acccount_info()['customer']['email'] : '';
	$email_value = siteattention_get_option( 'email', $email_from_reg);
	// output the field
	?>
    <input placeholder="Your account e-mail" type="text" name="siteattention_options[<?php echo esc_attr( $args['label_for'] ); ?>]" id="<?php echo esc_attr( $args['label_for'] ); ?>" size="30" value="<?php echo sanitize_email($email_value) ;?>"/><br/>
    <input type="button" id="siteattention_resend_email" value="Resend License Key">
	<?php
}

function siteattention_email_cb( $args ) {
	// get the value of the setting we've registered with register_setting()
	$email_from_reg = (!empty(siteattention_get_acccount_info()['customer']['email'])) ? siteattention_get_acccount_info()['customer']['email'] : '';
	$email_value = siteattention_get_option( 'email', $email_from_reg);
	$disabled = (siteattention_registered()) ? 'disabled="disabled"' : '';
	// output the field
	?>
    <input type="text" name="siteattention_options[<?php echo esc_attr( $args['label_for'] ); ?>]" id="<?php echo esc_attr( $args['label_for'] ); ?>" size="30" value="<?php echo sanitize_email($email_value) ;?>" <?php echo $disabled;?>/>
	<?php
}

function siteattention_iname_cb( $args ) {
	// get the value of the setting we've registered with register_setting()
	$iname_value = siteattention_get_option( 'iname' );
	$inameval = sanitize_text_field($iname_value);
	$getAllInstances = siteattention_get_acccount_info()['instances'];

	?>
	<select class="form-control" name="siteattention_options[<?php echo esc_attr( $args['label_for'] ); ?>]" id="<?php echo esc_attr( $args['label_for'] ); ?>" style="width: 301px;">
	<?php
	if(empty($getAllInstances)) {
	?>
        <option value="">-- no instances --</option>
	<?php
	}
	    foreach ($getAllInstances as $in) {
	?>
            <option value="<?php echo $in['token'];?>" <?php if($in['token'] == $inameval) { echo 'selected=selected';}?>><?php echo $in['readable_name'];?></option>
	<?php
	    }
	?>
	</select>
	<br><br>
    <input type="text" name="instance_name" id="instance_name" size="16"/>
    <input type="button" value="New Instance" id="siteattention_btn_newinstance" class="button button-primary"/>
	<?php
}

/**
 * top level menu
 */
function siteattention_options_page() {
	// add top level menu page
	add_menu_page(
		'SiteAttention',
		'SiteAttention',
		'manage_options',
		'siteattention',
		'siteattention_options_page_html',
		SITEATTENTION_PL_URL . '/admin/images/logo-icon-20px.png'
	);
}

/**
 * register our siteattention_options_page to the admin_menu action hook
 */
add_action( 'admin_menu', 'siteattention_options_page' );

$siteattention_info_assoc = null;
function siteattention_get_acccount_info() {
	global $siteattention_info_assoc;
	if($siteattention_info_assoc) {
		return $siteattention_info_assoc;
	}
	$key = siteattention_get_option('license_key', '');
	$iid = siteattention_get_option('iid', '');
	$name = siteattention_get_option('iname', '');
	if(!empty($key)) {
		$response = wp_remote_post( SITEATTENTION_API_URL . '/secure/license', [
			'headers'       => [
				'Content-Type'      => 'application/json',
				'X-SiteAttention'   => $key
			],
			'method'        => 'GET',
			'timeout'       => 15,
		]);
	}

	if (is_wp_error($response))
	{
		return false;
	}

	else
	{
		$resp_body = json_decode($response['body'],true);
		$siteattention_info_assoc = $resp_body;
	}

	return $siteattention_info_assoc;
}

// Save the now WP-saved registration settings in the remote SiteAttention database.
function siteattention_save_license() {
	$save_get_info = siteattention_get_acccount_info();
	if($save_get_info) {
		$instance_id = json_decode(base64_decode(siteattention_get_option('iname')));
		siteattention_set_option('iid', $instance_id->instance_id);
		return true;
	}
	else {
		return false;
	}
}

/**
 * top level menu:
 * callback functions
 */
function siteattention_options_page_html() {
	// check user capabilities
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	// add the filter
	add_filter( 'siteattention_form_submit_button', 'filter_siteattention_form_submit_button', 10, 2 );

	// add error/update messages

	// check if the user have submitted the settings
	// wordpress will add the "settings-updated" $_GET parameter to the url
	if ( isset( $_GET['settings-updated'] ) ) {
		siteattention_save_license();
		// show error/update messages
		if(siteattention_registered()) {
		    // add settings saved message with the class of "updated"
		    add_settings_error( 'siteattention_messages', 'siteattention_message', __( 'Settings Saved', 'siteattention' ), 'updated' );
            settings_errors( 'siteattention_messages' );
        } else {
            add_settings_error( 'siteattention_messages_error', 'siteattention_messages_error', __( 'invalid license', 'siteattention' ), 'updated' );
            settings_errors( 'siteattention_messages_error' );
        }
	}
	?>
    <div id="siteattention_logo" style="margin:6px 6px 0 0"><img src="<?php echo SITEATTENTION_PL_URL;?>/admin/images/logo.png" class="siteattention_head_logo" style="height:60px;width:auto"></div>
    <div class="mainwrap">
    <?php if(siteattention_registered()) { ?>
        <div class="info-wrap" style="display:block;width:45%;margin-left:5%;margin-bottom:5%;float:right;">
            <h2 style="font-size:1.8em">Your Account information</h2>
			<?php
			$sa_all_info = siteattention_get_acccount_info();
            if(!empty($sa_all_info)) {
			    $current_time = time();
			    $expire_time = strtotime($sa_all_info['expires']);
			    $readable_expire_time = date("d F Y",strtotime($sa_all_info['expires']));
			    $readable_updated_time = date("d F Y",strtotime($sa_all_info['updated']));
				$account_expired_html = ($expire_time < $current_time) ? ' (<b>Expired!</b>)<br/>Renew: <a href="' . SITEATTENTION_RENEW_URL . '" target="_blank">Renew now</a> or <a href="tel:+4588446060">Give us a call</a> (tel.: +45 88 44 60 60)' : '';
				$account_expired_class = (!empty($account_expired_html)) ? ' expired' : '';
				$datediff = $expire_time - $current_time;
				$days_left = '';
				if($datediff > 0) {
				    $days_left = round($datediff / (60 * 60 * 24)).' days left';
				}

				echo '<div style="display:block;padding-bottom:6px"><b style="display:inline-block;margin-right:10px">License:</b><span class="' . $account_expired_class . '">' . $days_left . '</span>' . $account_expired_html . '</div>';
				echo '<div style="display:block;padding-bottom:6px"><b style="display:inline-block;margin-right:10px">License expires date (Year-Month-Date time):</b>' . $readable_expire_time . '</div>';
				echo '<div style="display:block;padding-bottom:6px"><b style="display:inline-block;margin-right:10px">License last update date (Year-Month-Date time):</b>' . $readable_updated_time . '</div>';
				echo '<div style="display:block;padding-bottom:6px"><b style="display:inline-block;margin-right:10px">SiteAttention SEO page-limit:</b>' . $sa_all_info['page_quota'] . ' pages</div>';
				echo '<div style="display:block;padding-bottom:6px"><b style="display:inline-block;margin-right:10px">Pages used within page-limit:</b> ' . $sa_all_info['track_quota'] . ' pages</div>';
			}
			?>
        </div>
	<?php } ?>
    <div class="form-wrap"  <?php if(siteattention_registered()) echo 'style="display:block;width:50%;float:left;"' ;?>>
        <form action="options.php" method="post" id="siteattention_settings">
            <input type="hidden" name="op" id="op" value="siteattention_<?php echo (siteattention_show_license()) ? 'license_save' : 'register_save';?>">
			<?php
			global $wp_settings_sections, $wp_settings_fields;

			// output security fields for the registered setting "siteattention"
			settings_fields( 'siteattention' );
			// output setting sections and their fields
			// (sections are registered for "siteattention", each field is registered to a specific section)
			// do_settings_sections( 'siteattention' );
			$page = 'siteattention';

			foreach ( (array) $wp_settings_sections[$page] as $section ) {
				if($section['id'] === 'siteattention_section_license') {
					echo '<hr class="siteattention-hr-divider" style="margin-top:2em"/>';
				}
				echo '<div id="container_' . $section['id']. '">';
				if ( $section['title'] )
					echo "<h2 style=\"font-size:1.8em\" class='siteattention-expand' data-sa-expanded='collapsed' data-sa-expand-e='#container_{$section['id']} .siteattention-expand-form '>{$section['title']}</h2>\n";?>
                <div class="siteattention-expand-form">
					<?php if ( $section['callback'] )
						call_user_func( $section['callback'], $section );

					if ( ! isset( $wp_settings_fields ) || !isset( $wp_settings_fields[$page] ) || !isset( $wp_settings_fields[$page][$section['id']] ) )
						continue;
					echo '<table class="form-table">';
					do_settings_fields( $page, $section['id'] );
					echo '</table>';?>
                    <input type="button" value="<?php echo __('Clear form', 'siteattention') ;?>" class="siteattention_btn_clear button button-secondary"/>
					<?php
					if($section['id'] === 'siteattention_section_register') {
						echo '<input type="button" id="siteattention_btn_register" value="' . __('Get started!', 'siteattention') . '" class="button button-primary" ' . ((siteattention_registered()) ? 'disabled="disabled"' : '') . ' />';
					}?>
					<?php
					// output save settings button
					if($section['id'] !== 'siteattention_section_register') { ?>
                        <input type="submit" value="Save settings" class="button button-primary"/>
					<?php }?>
                </div>
			<?php } ?>

			<?php
			$site_url_noschema = get_site_url();
			$schema = array( 'http://', 'https://' );
			$replace = '';
			$site_url_noschema = str_replace( $schema, $replace, $site_url_noschema );
			?>
        </form>
        <script type="text/javascript">
            jQuery(document).ready(function() {
                jQuery('#siteattention_btn_newinstance').on('click', function(e) {
                    var instance_name = {"iname":jQuery('#instance_name').val()};
                    var license_key = jQuery('#siteattention_settings').find('#license_key').val();
                    if(license_key === "") {
                        var error_instance_msg = 'Please enter license key';
                        jQuery('#siteattention_register_status').html(error_instance_msg);return false;
                    }

                    jQuery.ajax({
                        url: '<?php echo SITEATTENTION_API_URL;?>/secure/instance/create',
                        type: 'post',
                        data: instance_name,
                        headers: {"x-siteattention": license_key},
                        dataType: 'json',
                        success: function (data) {
                            jQuery('form#siteattention_settings').submit();
                        }
                    });
                });

                jQuery('.siteattention_btn_clear').on('click', function(e) {
                    jQuery('#siteattention_settings').find("input[type=text], input[type=button]").attr("disabled", false);
                    jQuery('#siteattention_settings').find("input[type=text]").val("");
                    jQuery('form#siteattention_settings').submit();
                });

                jQuery('#siteattention_btn_register').on('click', function(e) {
                    jQuery('#siteattention_settings').find("input[type=text]").attr("disabled", false);
                    var siteatten_reg_data = {"cms":"WP","first_name":jQuery('#siteattention_settings #firstname').val(),"email":jQuery('#siteattention_settings #email').val(),"web":"<?php echo $site_url_noschema ;?>"};
                    e.preventDefault();
                    //var instance_data = null;
                    jQuery.ajax({
                        url: '<?php echo SITEATTENTION_API_URL;?>/signup/trial',
                        type: 'post',
                        data: siteatten_reg_data,
                        dataType: 'json',
                        success: function (data) {
                            var license_token = '';
                            if(data['member_subscribed'] === true) {
                                license_token = data['license_token'];
                            }

                            if(license_token !== null) {
                                jQuery('#siteattention_settings').find('#license_key').val(license_token);
                                jQuery('form#siteattention_settings').submit();
                            }
                        },
                        error: function(data) {
                            var getResponse = jQuery.parseJSON(data.responseText);
                            jQuery('#siteattention_register_status').html(getResponse.message);
                        }
                    });
                    return false;
                });

                jQuery('#siteattention_license_key_get_info').on('click', function(e) {
                    jQuery('form#siteattention_settings').submit();
                });
            });
        </script>
    </div>
	<?php
}

// display custom admin notice
function siteattention_custom_admin_notice() {
    if(current_user_can( 'activate_plugin', 'siteattention/siteattention.php' )) {
        $msg = __('SiteAttention SEO Plug-in is installed, but not yet ' . '<a href="' . admin_url( "options-general.php?page=siteattention" ) . '"> configured</a>', 'siteattention');
    }
    else {
        $msg = __('SiteAttention SEO Plug-in is installed, but not yet configured. Please ask a website-administrator to configure it.');
    }
?>
	<div class="notice notice-success is-dismissible">
		<p><?php echo $msg; ?></p>
	</div>

<?php }
// Only show the message on post/page edit views.
if(!siteattention_registered() && !empty($_GET['post']) && !empty($_GET['action']) && ($_GET['action'] === 'edit')) {
  add_action('admin_notices', 'siteattention_custom_admin_notice');
}

// Require the SEO toolbar, to be shown on editing pages in the WP-backend.
require_once plugin_dir_path( __FILE__ ) . '/includes/siteattention_seo_tool.php';

// register the hooks for activation, deactivation, install, uninstall
register_activation_hook( __FILE__, 'activate_siteattention' );
register_deactivation_hook( __FILE__, 'deactivate_siteattention' );
register_uninstall_hook(__FILE__, 'uninstall_siteattention');
