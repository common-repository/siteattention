<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       siteattention.com
 * @since      1.0.0
 *
 * @package    SiteAttention
 * @subpackage SiteAttention/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    SiteAttention
 * @subpackage SiteAttention/includes
 * @author     SiteAttention <dev@siteattention.com>
 */
class SiteAttention_i18n {

    /**
     * The unique identifier of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $name    The string used to uniquely identify this plugin.
     */
    private $name;

    /**
	 * Initialize the class, mostly for passing the name of the plugin
	 *
	 * @since    1.0.0
	 */
    public function __construct ( $name ){
        $this->name = $name;
    }

	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			$this->name,
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}

}
