<?php

require_once 'class-siteattention.php';

function activate_siteattention() {
	SiteAttention::resetOptions();
	$options = get_option(SiteAttention::NAME);

	if (empty($options['install']))
	{
		$options['installed'] = true;
		SiteAttention::saveOptions($options);
	}
}


function deactivate_siteattention() {
	flush_rewrite_rules();
}

function uninstall_siteattention() {
	SiteAttention::resetOptions(true);
}

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */


define ( 'SITEATTENTION_VERSION' , '3.0.7' );
define ( 'SITEATTENTION_NAME' , 'SiteAttention' );
define ( 'SITEATTENTION_URL' , SITEATTENTION_API_URL );

$SiteAttention = new SiteAttention();
$SiteAttention->run();
