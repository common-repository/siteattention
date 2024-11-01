<?php

/**
 * Admin Part of Plugin, dashboard and options.
 *
 * @package    siteattention
 * @subpackage siteattenion/admin
 */
class SiteAttention_Settings extends SiteAttention_Admin {

    /**
     * The ID of this Settings.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $name    The ID of this plugin.
     */
    private $id;


    /**
     * Initialize the class and set its properties.
     *
     * @since    1.0.0
     * @var      string    $name       The name of this plugin.
     * @var      string    $version    The version of this plugin.
     */
    public function __construct( $name , $version ) {

        $this->id = 'general';

        parent::__construct ( $name , $version );
    }


    /**
     * Creates our settings sections with fields etc.
     *
     * @since    1.0.0
     */
    public function settings_api_init (){

        $section_id = $this->name . '-display-options';

        // register_setting( $option_group, $option_name, $settings_sanitize_callback );
        register_setting(
            $this->name,
            $this->name,
            array( $this, 'process_settings' )
        );

        //add_settings_section( $id, $title, $callback, $menu_slug );
        add_settings_section(
            $section_id,
            apply_filters( $this->name . '-display-section-title', __( '', $this->name ) ),
            array( $this, 'display_options_section' ),
            $this->name
        );

        // add_settings_field( $id, $title, $callback, $menu_slug, $section, $args );
        add_settings_field(
            'license-key',
            apply_filters( $this->name . '-license-key-label', __( 'License key:', $this->name ) ),
            array( $this, 'key_field' ),
            $this->name,
            $section_id
        );

        add_settings_field(
            'iname-key',
            apply_filters( $this->name . '-license-key-label', __( 'Instance name:', $this->name ) ),
            array( $this, 'iname_field' ),
            $this->name,
            $section_id
        );

        add_settings_field(
            'iid-key',
            apply_filters( $this->name . '-license-key-label', __( 'Instance id:', $this->name ) ),
            array( $this, 'iid_field' ),
            $this->name,
            $section_id
        );

        // add_settings_field(
        //     'custom-css',
        //     apply_filters( $this->name . '-custom-css-label', __( 'Custom CSS:', $this->name ) ),
        //     array( $this, 'custom_css_field' ),
        //     $this->name,
        //     $section_id
        // );
        //
        // add_settings_field(
        //     'custom-js',
        //     __( 'Custom JS:', $this->name ) . '<button id="siteattention-restore-js" type="button" class="button siteattention-restore-js">Restore defaults</button>',
        //     array( $this, 'custom_js_field' ),
        //     $this->name,
        //     $section_id
        // );

    } // settings_api_init()


    /**
     * Creates a settings section
     *
     * @since       1.0.0
     * @param       array       $params         Array of parameters for the section
     * @return      mixed                       The settings section
     */
    public function display_options_section ( $params ) {

        echo '<p>' . $params['title'] . '</p>';

    } // display_options_section()


    /**
     * License key field & the hidden iid field
     *
     * @since       1.0.0
     * @return      mixed           The settings field
     */
    public function key_field () {

        //$options    = get_option( $this->name );
        $key = '';
        $iid = '';

        if ( isset ( $this->option['key'] ) ) {
            $key = $this->option['key'];
        }

        if ( isset ( $this->option['iid'] ) ) {
            $iid = $this->option['iid'];
        }

        ?>

        <input
            placeholder="<?php _e( 'Add your license key...', $this->name ); ?>"
            type="text"
            id="<?php echo "{$this->name}[key]" ?>"
            name="<?php echo "{$this->name}[key]" ?>"
            value="<?php echo esc_attr( $key ); ?>"
        >

        <input
            type="hidden"
            id="<?php echo "{$this->name}[iid]" ?>"
            name="<?php echo "{$this->name}[iid]" ?>"
            value="<?php echo esc_attr( $iid ); ?>"
            readonly
        >

        <?php
    } // key_field()


    /**
     * Instance Name field & the hidden instance locked field
     *
     * @since       1.0.0
     * @return      mixed           The settings field
     */
    public function iname_field () {

        //$options    = get_option( $this->name );

        $iname      = '';
        $ilocked    = 1;

        if ( isset ( $this->option['iname'] ) ) {
            $iname = $this->option['iname'];
        }

        if ( isset ( $this->option['ilocked'] ) ) {
            $ilocked = $this->option['ilocked'];
        }

        ?>

        <input
            placeholder="<?php _e( 'Your instance name...', $this->name ); ?>"
            type="text"
            id="<?php echo "{$this->name}[iname]" ?>"
            name="<?php echo "{$this->name}[iname]" ?>"
            value="<?php echo esc_attr( $iname ); ?>"
            <?php echo $ilocked ? 'readonly' : ''; ?>
        >

        <input
            type="hidden"
            id="<?php echo "{$this->name}[ilocked]" ?>"
            name="<?php echo "{$this->name}[ilocked]" ?>"
            value="<?php echo esc_attr( $ilocked ); ?>"
            readonly
        >

        <?php
    } // iname_key_field()


    /**
     * License key field & the hidden iid field
     *
     * @since       1.0.0
     * @return      mixed           The settings field
     */
    public function iid_field () {

        //$options    = get_option( $this->name );

        $iid        = '';
        $ilocked    = 1;

        if ( isset ( $this->option['iid'] ) ) {
            $iid = $this->option['iid'];
        }

        if ( isset ( $this->option['ilocked'] ) ) {
            $ilocked = $this->option['ilocked'];
        }

        ?>

        <input
            placeholder="<?php _e( 'Your instance key...', $this->name ); ?>"
            type="text"
            id="<?php echo "{$this->name}[iid]" ?>"
            name="<?php echo"{$this->name}[iid]" ?>"
            value="<?php echo esc_attr( $iid ); ?>"
            <?php echo $ilocked ? 'readonly' : ''; ?>
        >

        <?php
    } // iid_field()


    /**
     * Custom css field
     *
     * @since       1.0.0
     * @return      mixed           The settings field
     */
    public function custom_css_field () {

        //$options    = get_option( $this->name );
        $css     = '';

        if ( ! empty( $this->option['css'] ) ) {
            $css = $this->option['css'];
        }

        ?>

        <textarea
            class="code"
            rows="10"
            id="<?php echo "{$this->name}[css]" ?>"
            name="<?php echo "{$this->name}[css]" ?>"><?php echo esc_attr( $css ); ?></textarea>

        <p class="description">
            <?php _e( 'Add custom css for the post and page edit forms.', $this->name ); ?>
        </p>

        <?php
    } // custom_css_field()


    /**
     * Custom js field
     *
     * @since       1.0.0
     * @return      mixed           The settings field
     */
    public function custom_js_field () {

        //$options    = get_option( $this->name );
        $js         = '';

        if ( ! empty( $this->option['custom_js'] ) ) {
            $js = $this->option['custom_js'];

        } else {
            // Load the default
            $default_js_path = plugin_dir_path( dirname( __FILE__ ) ) . '../admin/js/siteattention-default.js';

            if ( file_exists($default_js_path) ) {
                $js = file_get_contents( $default_js_path );
            }
        }

        ?>

        <textarea
            class="code"
            rows="10"
            id="<?php echo "{$this->name}[js]" ?>"
            name="<?php echo "{$this->name}[js]" ?>"><?php echo esc_attr( $js ); ?></textarea>

        <p class="description">
            <?php _e( 'Custom mapping of your post and pages fields to SiteAttention. The SiteAttentionFields variable must be available.', $this->name ); ?>
        </p>

        <?php
    } // custom_js_field()

}
