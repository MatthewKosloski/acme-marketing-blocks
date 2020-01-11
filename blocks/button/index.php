<?php

function acme_marketing_blocks_button() {
    if (!function_exists('register_block_type')) {
		// Gutenberg is not active.
		return;
	}
 
    // automatically load dependencies and version
    $asset_file = include(plugin_dir_path( __FILE__ ) . 'build/index.asset.php');
 
    wp_register_script(
        'acme-marketing-blocks-button',
        plugins_url('build/index.js', __FILE__),
        $asset_file['dependencies'],
        $asset_file['version']
    );

    wp_register_style(
        'acme-marketing-blocks-button-editor',
        plugins_url('editor.css', __FILE__),
        array('wp-edit-blocks'),
        filemtime(plugin_dir_path( __FILE__) . 'editor.css')
    );
 
    register_block_type('acme-marketing-blocks/button', array(
        'editor_script' => 'acme-marketing-blocks-button',
        'editor_style' => 'acme-marketing-blocks-button-editor'
    ));
}

add_action('init', 'acme_marketing_blocks_button');

?>