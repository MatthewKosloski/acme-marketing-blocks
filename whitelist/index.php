<?php

function acme_marketing_blocks_whitelist($allowed_blocks) {
	return array(
		'core/image',
		'core/paragraph',
		'core/heading',
        'core/list',
        'core/cover',
        'core/html', // remove later
		'core/columns',
		'acme-marketing-blocks/catalog',
		'acme-marketing-blocks/button'
	);
}

add_filter('allowed_block_types', 'acme_marketing_blocks_whitelist');

?>