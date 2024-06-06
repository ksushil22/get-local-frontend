import React, {useState} from 'react';
import {Drawer, List} from "antd";
import {templateIds} from "../../util/TemplateIdConstants";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import {COLORS} from "../constants";
import {useSelector} from "react-redux";
import {PUBLIC_BUSINESS_API} from "../../../redux/api_url";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faBookOpen, faCommentDots, faHouseUser, faStar, faXmark} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";
import "./style.css"

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
        label: (<Link to={`${TEMPLATE_ID}/about-us`} style={{color: COLORS.PRIMARY_COLOR}}>About Us</Link>),
        key: 'about-us',
        icon: <FontAwesomeIcon icon={faCommentDots}/>,
        link: `/${TEMPLATE_ID}/about-us/`
    }
];

const Template1NavBar = () => {
    const screens = useBreakpoint();
    const businessId = useSelector((state) => state.business.businessId);
    const marginLeftLogo = screens.lg || screens.xl || screens.xxl ? 50 : 20;
    const Logo = () => (<img
        height={75}
        width={'auto'}
        style={{
            marginLeft: marginLeftLogo,
            cursor: 'pointer'
        }}
        loading={"lazy"}
        onClick={() => navigate(`/${TEMPLATE_ID}/home/`)}
        src={`${BASE_URL}${PUBLIC_BUSINESS_API}${businessId}/logo/`}
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
                    icon={open ? faXmark: faBars} size={'lg'}/>
            </div>
            <Drawer
                rootClassName={"nav-bar-drawer"}
                placement={'left'}
                open={open}
                onClose={() => setOpen(false)}
                extra={<Logo />}

            >
                <List
                    dataSource={items}
                    size={"large"}
                    renderItem={(item) => (
                        <List.Item
                            className={"drawer-nav-item"}
                            onClick={() => {
                                navigate(item.link)
                                setOpen(false)
                            }}
                            style={{
                                cursor: 'pointer'
                            }}
                        >
                            {item.icon} {item.label}
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
                height: 75
            }}
            grid={{ gutter: 24, column: items.length }}
            dataSource={items}
            size={"large"}
            renderItem={item => (
                <div
                    className={'navbar-item'}
                    style={{
                        display: 'inline-block',
                        marginRight: 20,
                        fontSize: 'medium',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        minWidth: 100,
                        maxWidth: '300px',
                        textAlign: 'center',
                    }}><span>{item.icon} {item.label}</span></div>
            )}
        />
    }

    const NavBar = screens.lg || screens.xl || screens.xxl ? ListNavBar : DrawerNavBar ;

    return <div style={{
        background: COLORS.PRIMARY_BACKGROUND,
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        padding: '0 20px'
    }}>
        <Logo />
        <div style={{
            flex: 1,
            height: 75,
            display: 'flex',
            alignItems: 'center',
        }}>
            <NavBar/>
        </div>
    </div>

}

export default Template1NavBar;
