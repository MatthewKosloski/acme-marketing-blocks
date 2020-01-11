<?php

require __DIR__ . '/../../vendor/autoload.php';

function acme_marketing_blocks_catalog_render_callback($attributes, $content) {

    $sanitizer = new enshrined\svgSanitize\Sanitizer();

    $terms = get_terms(array(
        'taxonomy' => 'catalog',
        'hide_empty' => false,
        'parent' => 0
    ));

    if(count($terms) === 0) {
        return 'No terms in catalog.';
    }

    $result = '<ul>';
    foreach($terms as $term) {
        $dirtySVG = get_term_meta($term->term_id, 'svg_icon', true);
        $cleanSVG = $sanitizer->sanitize($dirtySVG);
        $result .= sprintf('<li><a href="/catalog/%3$s">%1$s<p>%2$s</p></a></li>', 
            $cleanSVG, $term->name, $term->slug);
    }
    $result .= '</ul>';

    return $result;
}

function acme_marketing_blocks_catalog() {

    if(!function_exists('register_block_type')) {
		// Gutenberg is not active.
		return;
	}
 
    // automatically load dependencies and version
    $asset_file = include(plugin_dir_path( __FILE__ ) . 'build/index.asset.php');
 
    wp_register_script(
        'acme-marketing-blocks-catalog',
        plugins_url('build/index.js', __FILE__),
        $asset_file['dependencies'],
        $asset_file['version']
    );

    wp_register_style(
        'acme-marketing-blocks-catalog-editor',
        plugins_url('editor.css', __FILE__),
        array('wp-edit-blocks'),
        filemtime(plugin_dir_path( __FILE__) . 'editor.css')
    );
 
    register_block_type('acme-marketing-blocks/catalog', array(
        'editor_script' => 'acme-marketing-blocks-catalog',
        'editor_style' => 'acme-marketing-blocks-catalog-editor',
        'render_callback' => 'acme_marketing_blocks_catalog_render_callback'
    ));
 
}
add_action('init', 'acme_marketing_blocks_catalog');

?>