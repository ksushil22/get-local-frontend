import React, { memo, useEffect, useState, useCallback } from 'react';
import { useSelector } from "react-redux";
import { useGetBusinessItemCategoriesQuery, useGetMenuItemsQuery } from "../../../redux/services/businessAPI";
import {
    StyledHeading,
    StyledInput,
    StyledLabel,
    StyledMenuContainer,
    StyledMenuHeaderContainer, StyledMenuItemCard,
    StyledPanel,
    StyledTabs
} from "./StyledComponentsMenu";
import GetLoader, { DISPLAY, SPINNERS } from "../../util/customSpinner/GetLoader";
import "./style.css";
import { COLORS } from "../constants";
import "animate.css"
import {Image} from "antd";

const ItemCard = ({item}) => {
    return <StyledMenuItemCard
        className={"item-container animate__animated animate__fadeIn"}
        key={item.id}>
        <p>{item.name} - {item.currency+item.price}</p>
        <Image
            loading={"lazy"}
            preview={true}
            width={100} height={100} style={{
            objectFit: 'cover',
            borderRadius: 2
            }} src={item.image.url} alt={item.name}/>
    </StyledMenuItemCard>
}

const MemoizedTabPanel = memo(({ category, businessId, currentCategories, handleTabChange }) => {
    const isVisible = currentCategories.includes(category.id);

    const { data: menuItems, isLoading } = useGetMenuItemsQuery({
        businessId: businessId,
        categoryId: category.id }, { skip: !isVisible });

    return (
        <React.Fragment key={category.id}>
            <StyledInput
                className="input"
                name="tabs"
                type="radio"
                id={`tab-${category.id}`}
                defaultChecked={false}
                onClick={() => handleTabChange(category.id)}
            />
            <StyledLabel
                className="label"
                style={{
                    top: 0,
                    background: isVisible ? COLORS.PRIMARY_COLOR : '#e5e5e5',
                    color: isVisible ? COLORS.PRIMARY_BACKGROUND : '#7f7f7f'
                }}
                htmlFor={`tab-${category.id}`}>
                {category.name}
                <div style={{ marginRight: 0 }}>{!isVisible ? "+" : "-"}</div>
            </StyledLabel>
            <StyledPanel className={`panel expandable ${isVisible ? "expanded" : ""}`}>
                {!menuItems || isLoading ?
                    <GetLoader display={DISPLAY.AREA} spinner={SPINNERS.SKELETON_LIST}/>
                    :
                    <div>
                        {menuItems?.map(data => {
                            return <ItemCard item={data} />
                        })}
                    </div>
                }
            </StyledPanel>
        </React.Fragment>
    );
});

const Template1Menu = () => {
    const businessId = useSelector(state => state.templateBusiness.businessId);
    const [currentCategories, setCurrentCategories] = useState([]);
    const { data: categories, isLoading: loadingCategories } = useGetBusinessItemCategoriesQuery(businessId);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [])
    const handleTabChange = useCallback((id) => {
        setCurrentCategories(prevSelectedCategories => {
            if (prevSelectedCategories.includes(id)) {
                return prevSelectedCategories.filter(categoryId => categoryId !== id);
            } else {
                return [...prevSelectedCategories, id];
            }
        });
    }, []);

    return (
        <StyledMenuContainer>
            <StyledMenuHeaderContainer>
                <StyledHeading>Menu</StyledHeading>
            </StyledMenuHeaderContainer>
            {loadingCategories ?
                <GetLoader spinner={SPINNERS.SKELETON_LIST} display={DISPLAY.AREA} />
                :
                (
                    <StyledTabs>
                        {categories?.map((category, index) => (
                            <MemoizedTabPanel
                                category={category}
                                currentCategories={currentCategories}
                                handleTabChange={handleTabChange}
                                businessId={businessId}
                            />
                        ))}
                    </StyledTabs>
                )
            }
        </StyledMenuContainer>
    );
};

export default Template1Menu;
