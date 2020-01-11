<?php

function acme_marketing_blocks_category($categories, $post) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'acme-marketing-blocks',
				'title' => 'Acme Marketing Blocks', 'acme-marketing-blocks'
			),
		)
	);
}
add_filter('block_categories', 'acme_marketing_blocks_category', 10, 2);

?>