import { registerBlockType } from '@wordpress/blocks';
import { withSelect } from '@wordpress/data';
import DOMPurify from 'dompurify';

import constants from '../../../constants';

registerBlockType(`${constants.NAMESPACE}/catalog`, {
    title: `${constants.BLOCK_TITLE_PREFIX} Catalog`,
    category: constants.BLOCK_CATEGORY,
    icon: 'screenoptions',
    edit: withSelect((select) => {
        return {
            catalogTerms: select('core')
                .getEntityRecords('taxonomy', 'catalog', {parent: 0})
        };
    })(({catalogTerms, className}) => {
 
        if(!catalogTerms) {
            return 'Loading...';
        }
 
        if(catalogTerms && catalogTerms.length === 0) {
            return 'No catalog terms.';
        }

        const listItems = catalogTerms.map(({acf: {svg_icon}, name}) => 
            <li className={`${className}-column`}>
                <div dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(svg_icon)
                }} />
                <p>{name}</p>
            </li>
        );
 
        return (
            <ul className={`${className}-row`}>
                {listItems}
            </ul>
        );
    }),
});