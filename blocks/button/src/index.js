import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { SelectControl, TextControl } from '@wordpress/components';

import constants from '../../../constants';
import Icon from '../../../components/Icon';

const buttonVariants = {
    filled: 'filled',
    filledArrow: 'filled-arrow',
    stroke: 'stroke',
    strokeArrow: 'stroke-arrow'
};

// Maps btnVariant to a boolean value indicating whether to render
// an svg icon inside the button
const hasIcon = (btnVariant) => {
    return (btnVariant === buttonVariants.filledArrow 
        || btnVariant === buttonVariants.strokeArrow);
}

const getChildren = (btnText, hasIcon) => {
    return (
        <>
            {btnText}
            {hasIcon && <Icon name="right-arrow" width="16" />} 
        </>
    );
};

registerBlockType(`${constants.NAMESPACE}/button`, {
    title: `${constants.BLOCK_TITLE_PREFIX} Button`,
    category: constants.BLOCK_CATEGORY,
    icon: 'universal-access-alt',
    attributes: {
        btnText: {
            type: 'string',
            source: 'text',
            selector: 'a',
            default: 'Button text'
        },
        btnVariant: {
            type: 'string',
            default: buttonVariants.filled
        },
        btnUrl: {
            type: 'string'
        }
    },
    edit: (props) => {
        const { 
            attributes: { 
                btnText, 
                btnVariant,
                btnUrl 
            }, 
            setAttributes, 
            className 
        } = props;

        const onChangeBtnText = (newBtnText) => {
            setAttributes({btnText: newBtnText});
        };

        const onChangeBtnVariant = (newBtnVariant) => {
            setAttributes({btnVariant: newBtnVariant})
        };

        const onChangeBtnUrl = (newBtnUrl) => {
            setAttributes({btnUrl: newBtnUrl});
        };

        return (
            <>
                <InspectorControls>
                    <SelectControl
                        label="Variant"
                        value={btnVariant}
                        options={[
                            {value: buttonVariants.filled, label: 'Filled'},
                            {value: buttonVariants.filledArrow, label: 'Filled with Arrow'},
                            {value: buttonVariants.stroke, label: 'Stroke'},
                            {value: buttonVariants.strokeArrow, label: 'Stroke with Arrow'}
                        ]}
                        onChange={onChangeBtnVariant}
                    />
                    <TextControl 
                        label="URL"
						value={btnUrl}
						onChange={onChangeBtnUrl}
                    />
                    <TextControl 
                        label="Text"
						value={btnText}
						onChange={onChangeBtnText}
                    />
                </InspectorControls>
                <div className={`${className} ${btnVariant}`}>
                    <div className={`${className}--inner`}>
                        {getChildren(btnText, hasIcon(btnVariant))} 
                    </div> 
                </div>
            </>
        );
    },
    save: ({attributes: {btnText, btnVariant, btnUrl}}) => {
        return (
            <a href={btnUrl} className={btnVariant}>
                {getChildren(btnText, hasIcon(btnVariant))}   
            </a>
        )
    }
});