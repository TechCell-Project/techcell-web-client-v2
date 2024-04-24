'use client';

import { VariationDto, PriceDto, AttributeInProductDto } from '@techcell/node-sdk';
import { useState } from 'react';
import { ProductPrice } from '@/components/common/product-price';

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

interface SelectProductVariationProps {
  variations: VariationDto[];
}

export const SelectProductVariation = ({ variations }: SelectProductVariationProps) => {
  const [currentPrice, setCurrentPrice] = useState<PriceDto>(variations[0].price);
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, AttributeInProductDto>
  >({});
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);

  // Get the keys of the attribute groups in the product variation
  const attributeKeys = getUniqueAttributeKeys(variations);

  // Group attributes by their keys
  const attributeMaps = Object.entries(extractAttributeMaps(variations));

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

  return (
    <div className="flex flex-col gap-4">
      <ProductPrice price={currentPrice} />
    </div>
  );
};
