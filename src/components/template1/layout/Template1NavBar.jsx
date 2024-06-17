import React, {useState} from 'react';
import {Drawer, Image, List} from "antd";
import {templateIds} from "../../util/TemplateIdConstants";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import {COLORS, StyledDiv} from "../constants";
import {useSelector} from "react-redux";
import {PUBLIC_BUSINESS_API} from "../../../redux/api_url";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faBookOpen, faCommentDots, faHouseUser, faStar, faXmark} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";
import "./style.css"
import {scrollToSection} from "../../util/Commons";
import {useGetBusinessLogoQuery} from "../../../redux/services/businessAPI";

const BASE_URL = process.env.BASE_API_URL;
const TEMPLATE_ID = templateIds.Template1;


const items = [
    {
        label: (<Link to={`/${TEMPLATE_ID}/home/`} style={{color: COLORS.PRIMARY_COLOR}}>Home</Link>),
        key: 'home',
        icon: <FontAwesomeIcon icon={faHouseUser}/>,
        link: `/${TEMPLATE_ID}/home/`
    },
    {
        label: (<Link to={`/${TEMPLATE_ID}/menu`} style={{color: COLORS.PRIMARY_COLOR}}>Menu</Link>),
        key: 'menu',
        icon: <FontAwesomeIcon icon={faBookOpen}/>,
        link: `/${TEMPLATE_ID}/menu/`
    },
    {
        label: (<Link to={`${TEMPLATE_ID}/review`} style={{color: COLORS.PRIMARY_COLOR}}>Review</Link>),
        key: 'reviews',
        icon: <FontAwesomeIcon icon={faStar}/>,
        link: `/${TEMPLATE_ID}/about-us/`
    },
    {
        label: (<a onClick={() => scrollToSection('about-us')} style={{color: COLORS.PRIMARY_COLOR}}>About Us</a>),
        key: 'about-us',
        icon: <FontAwesomeIcon icon={faCommentDots}/>,
        callback: () => scrollToSection('about-us')
    }
];

const Template1NavBar = () => {
    const screens = useBreakpoint();
    const businessId = useSelector((state) => state.business.businessId);
    const marginLeftLogo = screens.lg || screens.xl || screens.xxl ? 50 : 20;
    const {data: logo, isLoading: loadingLogo} = useGetBusinessLogoQuery({businessId})
    const Logo = () => (
        <img
            height={60}
            width={'auto'}
            style={{
                marginLeft: marginLeftLogo,
                cursor: 'pointer'
            }}
            loading={"lazy"}
            onClick={() => navigate(`/${TEMPLATE_ID}/home/`)}
            src={logo?.url}
            alt={businessId}
        />)

    const navigate = useNavigate()


    const DrawerNavBar = () => {
        const [open, setOpen] = useState(false)

        return <div
            style={{
                cursor: "pointer",
                float: "right",
                alignItems: 'right',
                justifyContent: 'right',
                display: 'flex', // Use flex layout for the container
                flexWrap: 'wrap', // Allow items to wrap to the next line if needed
                width: '100%',
            }}>
            <div
                onClick={() => setOpen(true)}>
                <FontAwesomeIcon
                    icon={open ? faXmark : faBars} size={'lg'}/>
            </div>
            <Drawer
                rootClassName={"nav-bar-drawer"}
                placement={'right'}
                open={open}
                onClose={() => setOpen(false)}
                extra={<Logo/>}
                styles={{
                    backgroundColor: COLORS.PRIMARY_BACKGROUND
                }}
            >
                <List
                    dataSource={items}
                    size={"large"}
                    renderItem={(item) => (
                        <List.Item
                            className={"drawer-nav-item"}
                            onClick={() => {
                                if (item.callback) {
                                    item.callback()
                                } else {
                                    navigate(item.link)
                                }
                                setOpen(false)
                            }}
                            style={{
                                cursor: 'pointer'
                            }}
                        >
                            <StyledDiv>
                                {item.icon} {item.label}
                            </StyledDiv>
                        </List.Item>
                    )}
                />
            </Drawer>
        </div>
    }

    const ListNavBar = () => {

        return <List
            style={{
                background: 'none',
                color: 'black',
                float: 'right',
                alignItems: 'right',
                justifyContent: 'right',
                marginRight: 100,
                display: 'flex', // Use flex layout for the container
                flexWrap: 'wrap', // Allow items to wrap to the next line if needed
                width: '100%',
                height: 60
            }}
            grid={{gutter: 24, column: items.length}}
            dataSource={items}
            size={"large"}
            renderItem={item => (
                <StyledDiv
                    onClick={() => {
                        if (item.callback) {
                            item.callback()
                        } else {
                            navigate(item.link)
                        }
                    }}
                    className={'navbar-item'}
                    style={{
                        display: 'inline-block',
                        marginRight: 20,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        minWidth: 100,
                        maxWidth: '300px',
                        textAlign: 'center',
                    }}><span>{item.icon} {item.label}</span></StyledDiv>
            )}
        />
    }

    const NavBar = screens.lg || screens.xl || screens.xxl ? ListNavBar : DrawerNavBar;

    return <div style={{
        backgroundColor: 'rgba(245,245,245,0.8)',
        backdropFilter: 'blur(10px)',
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'sticky',
        alignItems: 'center',
        padding: '0 20px',
        top: 0,
        zIndex: 1000
    }}>
        <Logo/>
        <div style={{
            flex: 1,
            height: 60,
            display: 'flex',
            alignItems: 'center',
        }}>
            <NavBar/>
        </div>
    </div>

}

export default Template1NavBar;
