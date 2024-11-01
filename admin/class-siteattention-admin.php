<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       siteattention.com
 * @since      1.0.0
 *
 * @package    SiteAttention
 * @subpackage SiteAttention/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    SiteAttention
 * @subpackage SiteAttention/admin
 * @author     SiteAttention <dev@siteattention.com>
 */
class SiteAttention_Admin {

    /**
     * The ID of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $name    The ID of this plugin.
     */
    protected $name;

    /**
     * The version of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $version    The current version of this plugin.
     */
    protected $version;

    /**
     * The WordPress options specific to SiteAttention
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $version    The current version of this plugin.
     */
    protected $option;

    /**
     * Initialize the class and set its properties.
     *
     * @since    1.0.0
     * @param      string    $name       The name of this plugin.
     * @param      string    $version    The version of this plugin.
     */
    public function __construct( $name, $version ) {

        $this->name = $name;
        $this->version = $version;
        $this->option = siteattention_get_option($this->name);
    }

    /**
     * Register the stylesheets for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_styles() {

        if
        (   // get out if not on edit page
            !function_exists('get_current_screen') ||
            (
                get_current_screen()->id !== 'post' &&
                get_current_screen()->id !== 'page'
            )
        ) return;

        wp_enqueue_style(
            $this->name,
            plugin_dir_url( __FILE__ ) . 'css/siteattention-admin.css',
            array(),
            $this->version,
            'all'
        );
    }

    /**
     * Register the JavaScript for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts() {

        if
        (   // get out if not on edit page
            !function_exists('get_current_screen') ||
            (
                get_current_screen()->id !== 'post' &&
                get_current_screen()->id !== 'page'
            )
        ) return;

        // SiteAttention API
        /*wp_enqueue_script(
            $this->name . 'Api',
	        plugin_dir_url( __FILE__ ) . 'js/siteattention-main.js',
            array($this->name),
            null,
            true
        );*/

        // Below - JS code for displaying the UI Toolbar on edit pages.
        // SiteAttention Module
        if(siteattention_registered()) {
        wp_enqueue_script(
            $this->name,
            plugin_dir_url( __FILE__ ) . 'js/siteattention-module.js',
            array('jquery'),
            $this->version,
            true
        );

        $current_user = wp_get_current_user();
        $instance_id = siteattention_get_option('iid', '');
        $getThreshold = $this->getThreshold($instance_id);
        wp_localize_script($this->name, 'SiteAttentionInfo', [
            'user' => $current_user->ID,
            'user_name' => $current_user->user_login,
            'language' => get_locale(),
            'key' => siteattention_get_option('license_key', ''),
            'post_type' => get_current_screen()->id,
            'iid' => $instance_id,
            'url' => get_permalink(get_the_ID()),
            'site_url' => site_url(),
            'pid' => get_the_ID(),
            'published' => get_post_status() === 'publish',
            'apiUrl' => SiteAttention::URL,
	        'siteattention_threshold_value' => $getThreshold,
        ]);
        // Above - JS code for displaying the UI Toolbar on edit pages.
        }
    }

	/**
	 * Get Threshold
	 *
	 * @since       1.0.0
	 * @return      mixed
	 */
	public function getThreshold($instance_id){
		$response = wp_remote_post(SiteAttention::URL.'/secure/init/'.$instance_id.'/'.get_the_ID().'/wp/en_GB', array(
			'method'        => 'GET',
			'timeout'       => 15,
			'headers'       => array(
				'X-SiteAttention'   => siteattention_get_option('license_key', siteattention_get_option('key', ''))
			)
		));

		if (is_wp_error($response))
		{
			return SITEATTENTION_THRESHOLD;
		}

		else
		{
			$score_threshold = json_decode($response['body'],true);
			return $score_threshold['data_score_threshold'];
		}
	}

    /**
     * Plugin Settings Link on plugin page
     *
     * @since       1.0.0
     * @return      mixed           The settings field
     */
    public function add_settings_link( $links ) {

        $mylinks = array(
            '<a href="' . admin_url( "options-general.php?page=siteattention" ) . '">' . __( 'Settings', $this->name ) . '</a>',
        );
        return array_merge( $links, $mylinks );
    }

    /**
     * Plugin Settings route adding
     *
     * @since       1.0.0
     * @return      mixed           The settings field
     */
    public function add_settings_route(){
        add_rewrite_endpoint('siteattention/settings', EP_ROOT);
        flush_rewrite_rules();
    }

    /**
     * Enables the Excerpt meta box in Page edit screen.
     */
    public function add_excerpt_to_pages() {

        add_post_type_support ( 'page', 'excerpt' );
    }

    /**
      * Show the needed meta boxes.
      */
    public function show_meta_boxes( $hidden , $screen ) {

        if ( in_array ( $screen->id , [ 'post', 'page' ] ) ) {

            $hidden = array_diff( $hidden , array ( 'postexcerpt' , 'tagsdiv-post_tag' , 'slugdiv' ) );
        }

        return $hidden;
    }

	/**
	 * Add keyword in postmeta
	 */
	public function add_post_meta_keyword() {
		add_post_meta( $_POST['post_id'], 'page_keyword', $_POST['page_keyword']);
	}

	/**
	 * get keyword from postmeta
	 */
	public function get_post_meta_keyword() {
		echo json_encode(get_post_meta( $_POST['post_id'], 'page_keyword'));die();
	}

	/**
	 * remove keyword from postmeta
	 */
	public function remove_post_meta_keyword() {
		delete_post_meta($_POST['post_id'],'page_keyword', $_POST['page_keyword']);
	}
}
