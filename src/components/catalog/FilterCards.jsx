import React from "react";
import styled from "styled-components";
import Icon from "../ui/Icon";

const FilterCardsContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

const FilterStepHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

const FilterStepTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  font-weight: 700;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  }
`;

const FilterStepDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.md};
    margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
`;

const FilterCard = styled.div`
  background: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  box-shadow: ${({ $isSelected, theme }) => 
    $isSelected 
      ? `0 4px 12px ${theme.colors.primary}40` 
      : theme.shadows.md
  };
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ $isSelected, theme }) => 
      $isSelected 
        ? `0 4px 12px ${theme.colors.primary}40` 
        : theme.shadows.lg
    };
    transform: translateY(-4px);
  }

  ${({ $isSelected }) =>
    $isSelected &&
    `
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primaryLight} 0%, ${({ theme }) => theme.colors.light} 100%);
  `}
`;

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  font-weight: 600;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const CardCount = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.lightGray};
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: inline-block;
`;

const SelectedIndicator = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.light};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: bold;
`;


const FilterCards = ({
  step,
  options = [],
  selectedValue,
  onSelect,
}) => {
  if (!step) return null;

  return (
    <FilterCardsContainer>
      <FilterStepHeader>
        <FilterStepTitle>{step.displayName}</FilterStepTitle>
        <FilterStepDescription>{step.description}</FilterStepDescription>
      </FilterStepHeader>

      <CardsGrid>
        {options.map((option) => (
          <FilterCard
            key={option.value}
            $isSelected={selectedValue === option.value}
            onClick={() => onSelect(option.value)}
          >
            {selectedValue === option.value && (
              <SelectedIndicator>
                <Icon name="FaCheck" size="xs" />
              </SelectedIndicator>
            )}
            
            
            <CardTitle>{option.label}</CardTitle>
            {option.count && <CardCount>{option.count} productos</CardCount>}
          </FilterCard>
        ))}
      </CardsGrid>
    </FilterCardsContainer>
  );
};

export default FilterCards;
