'use client';

import { VariationDto, PriceDto, AttributeInProductDto } from '@techcell/node-sdk';
import { useEffect, useState } from 'react';
import { ProductPrice } from '@/components/common/product-price';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useUpdateEffect } from 'ahooks';
import { BuyingButtonGroup } from './button-buy';

// Function to get unique attribute keys from all variations
const getUniqueAttributeKeys = (variations: VariationDto[]) =>
  Array.from(
    new Set(variations.flatMap((variation) => variation.attributes.map((attr) => attr.k))),
  );

// Group attributes by their keys
const extractAttributeMaps = (variations: VariationDto[]) => {
  const attributeMaps: Record<string, Map<string, AttributeInProductDto>> = {};

  for (const variation of variations) {
    for (const attribute of variation.attributes) {
      // Initialize the map for the attribute key if it doesn't exist
      if (!attributeMaps[attribute.k]) {
        attributeMaps[attribute.k] = new Map();
      }

      // Add the attribute value and its details to the map
      attributeMaps[attribute.k].set(attribute.v.toLowerCase(), attribute);
    }
  }

  return attributeMaps;
};

// check if an attribute is contained in a variation
const isAttributeInVariation = (variation: VariationDto, attribute: AttributeInProductDto) => {
  return variation.attributes.some(
    (attr) => attr.k === attribute.k && attr.v.toLowerCase() === attribute.v.toLowerCase(),
  );
};

// return key and name of an attribute
const getKeyName = (keyName: string) => {
  const [key, name] = keyName.split('/');
  return { key, name };
};

interface SelectProductVariationProps {
  variations: VariationDto[];
  productId: string;
  handleClose?: () => void;
}

export const SelectProductVariation = ({ variations, productId, handleClose }: SelectProductVariationProps) => {
  const modifiedVariations = variations.map((variation) => {
    return {
      ...variation,
      attributes: variation.attributes.map((attr) => {
        return {
          ...attr,
          k: attr.k + '/' + attr.name,
        };
      }),
    } as VariationDto;
  });
  const [currentPrice, setCurrentPrice] = useState<PriceDto>(modifiedVariations[0].price);
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, AttributeInProductDto>
  >({});
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);

  // Get the keys of the attribute groups in the product variation
  const attributeKeys = getUniqueAttributeKeys(modifiedVariations);

  // Group attributes by their keys
  const attributeMaps = Object.entries(extractAttributeMaps(modifiedVariations));

  // handle selecting attribute
  const handleAttributeSelection = (attribute: AttributeInProductDto) => {
    // do nothing if select same attributes values
    if (attribute.k in selectedAttributes && selectedAttributes[attribute.k] === attribute) {
      return;
    }
    setSelectedAttributes((prevState) => {
      const newState = { ...prevState, [attribute.k]: attribute };

      // Find the index of the current attribute group
      const currentIndex = attributeKeys.indexOf(attribute.k);

      // Remove the selections of the subsequent attribute groups
      for (let i = currentIndex + 1; i < attributeKeys.length; i++) {
        delete newState[attributeKeys[i]];
        setSelectedVariation(null);
      }

      return newState;
    });
  };

  // get the variations that have the current attributes
  const getOtherAttributesVariations = (key: string) => {
    // get other attributes in selectedAttributes except for current key
    const otherAttributes = Object.entries(selectedAttributes).filter(
      ([selectedKey]) => selectedKey !== key,
    );

    const variationsMatchedWithOtherAttributes = modifiedVariations.filter((variation) =>
      otherAttributes.every(([, otherAttribute]) =>
        isAttributeInVariation(variation, otherAttribute),
      ),
    );
    return variationsMatchedWithOtherAttributes;
  };

  if (Object.entries(selectedAttributes).length === 0) {
    // get first attribute from first key of the map
    // const firstAttribute = Array.from(attributeMaps[0][1].values())[0]; -- way 1
    // -- way 2
    const firstAttribute = modifiedVariations[0].attributes[0];
    setSelectedAttributes({ [firstAttribute.k]: firstAttribute });
  }

  useEffect(() => {
    // Check if all the attribute groups have a selected attribute
    if (attributeKeys.every((key) => key in selectedAttributes)) {
      const matchingVariation = modifiedVariations.find((variation) =>
        variation.attributes.every(
          (attribute) => selectedAttributes[attribute.k]?.v === attribute.v,
        ),
      );
      if (matchingVariation) setSelectedVariation(matchingVariation.skuId);
    }
  }, [selectedAttributes, modifiedVariations, attributeKeys]);

  useUpdateEffect(() => {
    const price = modifiedVariations.find(
      (variation) => variation.skuId === selectedVariation,
    )?.price;

    if (price) {
      setCurrentPrice(price);
    }
  }, [selectedVariation]);

  const handleSelectColorAttribute = (attributeIndex: number) => {
    console.log(attributeIndex);
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <ProductPrice price={currentPrice} />
      {attributeMaps.map(([keyName, attributes], index) => (
        <div key={getKeyName(keyName).key} className="flex flex-col gap-2.5 mb-4">
          <h4 className="text-sm sm:text-base font-semibold">{getKeyName(keyName).name}</h4>
          <div className="flex gap-2.5 sm:gap-5 flex-wrap">
            {Array.from(attributes.values()).map((attribute, attrIndex) => {
              let attributeName = attribute.v;
              if (attribute.u) {
                attributeName += ' ' + attribute.u.toUpperCase();
              }

              // if this attribute is selected
              const isSelected =
                selectedAttributes[attribute.k]?.v.toLowerCase() === attribute.v.toLowerCase();

              let isSelectable = false;

              if (index === 0) {
                // we can select any thing at first row
                isSelectable = true;
              } else if (index <= Object.entries(selectedAttributes).length) {
                // get variations available with current selected attributes and this attribute key
                const availableVariations = getOtherAttributesVariations(attribute.k);
                // check if this attribute appears in available variations
                isSelectable = availableVariations.some((variation) =>
                  isAttributeInVariation(variation, attribute),
                );
              }

              const onSelectAttribute = () => {
                if (attribute.k === 'color') {
                  handleSelectColorAttribute(attrIndex);
                  handleAttributeSelection(attribute);
                } else {
                  handleAttributeSelection(attribute);
                }
              };

              return (
                <Button
                  key={getKeyName(attribute.k).key + attribute.v}
                  variant="outline"
                  className={cn(
                    'capitalize px-4 py-2 rounded-md text-black border-gray-700 border transition-all duration-300 hover:text-primary hover:border-primary disabled:border-gray-700 disabled:text-gray-600',
                    isSelected ? 'text-primary border border-primary bg-primary-foreground' : '',
                  )}
                  onClick={onSelectAttribute}
                  disabled={!isSelectable}
                >
                  <p>{attributeName}</p>
                </Button>
              );
            })}
          </div>
        </div>
      ))}
      <BuyingButtonGroup productId={productId} skuId={selectedVariation} handleCloseModal={handleClose} />
    </div>
  );
};
