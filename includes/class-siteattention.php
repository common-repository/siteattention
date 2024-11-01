<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       siteattention.com
 * @since      1.0.0
 *
 * @package    SiteAttention
 * @subpackage SiteAttention/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    SiteAttention
 * @subpackage SiteAttention/includes
 * @author     SiteAttention <dev@siteattention.com>
 */
class SiteAttention {

    private $option;
    protected $loader;

    const NAME = SITEATTENTION_NAME;
    const VERSION = SITEATTENTION_VERSION;
    const URL = SITEATTENTION_URL;

    public function __construct() {

        $this->load_dependencies();
        $this->set_locale();
        $this->define_admin_hooks();
        $this->define_public_hooks();

        $this->option = get_option(self::NAME);
    }


    public static function resetOptions($uninstall=false){
        $options = get_option ( self::NAME );
        self::saveOptions([
            'key' => $uninstall ? '' : isset ( $options['key']) ? $options['key'] : '',
            'iid' => isset ( $options['iid']) ? $options['iid'] : '',
            'iname' => isset ( $options['iname']) ? $options['iname'] : '',
            'ilocked' => isset ( $options['ilocked']) ? $options['ilocked'] : false,
            'guid' => isset ( $options['guid']) ? $options['guid'] : '',
            'installed' => $uninstall ? false : isset($options['installed']) ? $options['installed'] : false,
        ]);
    }

    public static function saveOptions($data){
        delete_option ( self::NAME );
        add_option ( self::NAME, [
            'key' => isset ( $data['key']) ? $data['key'] : '',
            'iid' => isset ( $data['iid']) ? $data['iid'] : '',
            'iname' => isset ( $data['iname']) ? $data['iname'] : '',
            'ilocked' => isset ( $data['ilocked']) ? $data['ilocked'] : false,
            'guid' => isset ( $data['guid']) ? $data['guid'] : '',
            'installed' => isset ( $data['installed']) ? $data['installed'] : false,
        ]);
    }

    public function run() {
        $this->loader->run();
    }

    public function get_loader() {
        return $this->loader;
    }

    private function load_dependencies() {

        /**
         * The class responsible for orchestrating the actions and filters of the
         * core plugin.
         */
        require_once 'class-siteattention-loader.php';

        /**
         * The class responsible for defining internationalization functionality
         * of the plugin.
         */
        require_once 'class-siteattention-i18n.php';

        /**
         * The class responsible for defining all actions that occur in the admin area.
         */
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-siteattention-admin.php';

        /**
         * The class responsible for defining all Settings.
         */
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/settings/class-siteattention-settings.php';

        /**
         * The class responsible for defining all actions that occur in the public-facing
         * side of the site.
         */
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-siteattention-public.php';

        $this->loader = new SiteAttention_Loader();
    }

    private function set_locale() {

        $plugin_i18n = new SiteAttention_i18n( self::NAME );

        $this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );
    }

    private function define_admin_hooks() {

        $plugin_admin = new SiteAttention_Admin( self::NAME , self::VERSION );

	    // Add the SiteAttention styles and scripts
        $this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
        $this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );

        //Save post meta
	    $this->loader->add_action( 'wp_ajax_add_postmeta', $plugin_admin, 'add_post_meta_keyword' );
	    $this->loader->add_action( 'wp_ajax_get_postmeta', $plugin_admin, 'get_post_meta_keyword' );
	    $this->loader->add_action( 'wp_ajax_remove_postmeta', $plugin_admin, 'remove_post_meta_keyword' );

        // Setup plugin settings link
//        $this->loader->add_action( 'admin_menu', $plugin_admin, 'siteattention_admin_menu' );
        $this->loader->add_filter( 'plugin_action_links_siteattention/siteattention.php', $plugin_admin, 'add_settings_link' , 10 , 1 );

        // SiteAttention settings endpoint
        $this->loader->add_action( 'init', $plugin_admin, 'add_settings_route' );
        // Add Excerpt section to pages edit page
        $this->loader->add_action( 'init', $plugin_admin, 'add_excerpt_to_pages' );

        // Show meta boxes by default
        $this->loader->add_filter( 'hidden_meta_boxes', $plugin_admin, 'show_meta_boxes', 10, 2);
    }

    private function define_public_hooks() {

        $plugin_public = new SiteAttention_Public( self::NAME , self::VERSION );

        // Add the SiteAttention styles and scripts
        $this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );
        $this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );

        // Add default metakeywords and metadescription
        $this->loader->add_action( 'wp_head', $plugin_public, 'add_meta_tags' );
    }
}
