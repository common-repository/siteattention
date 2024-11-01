<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       siteattention.com
 * @since      1.0.0
 *
 * @package    SiteAttention
 * @subpackage SiteAttention/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    SiteAttention
 * @subpackage SiteAttention/public
 * @author     SiteAttention <dev@siteattention.com>
 */
class SiteAttention_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $name    The ID of this plugin.
	 */
	private $name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $name, $version ) {

		$this->name = $name;
		$this->version = $version;
	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in SiteAttention_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The SiteAttention_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		// wp_enqueue_style( $this->name, plugin_dir_url( __FILE__ ) . 'css/siteattention-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in SiteAttention_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The SiteAttention_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		// wp_enqueue_script( $this->name, plugin_dir_url( __FILE__ ) . 'js/siteattention-public.js', array( 'jquery' ), $this->version, false );

	}

    /**
     * Add default metadescription and metakeywords
     */
    public function add_meta_tags() {

        if ( ! is_single() && ! is_page () ) return;

        $meta = get_the_excerpt ( get_the_ID () );

        if ( $meta ) {
            $meta = strip_tags( $meta );
            $meta = strip_shortcodes( $meta );
            $meta = str_replace( array("\n", "\r", "\t"), ' ', $meta );
            echo '<meta name="description" content="' . $meta . '" />' . "\n";
        }

    }

}
