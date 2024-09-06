import React from 'react';
import {BlockHeading, ListItemContainer, ListItemImage, ListItemInfo} from "./StyledComponents";
import GetAnimation from "../util/GetAnimation";


const services = [
    {
        'id': 1,
        'name': 'Marketing',
        'path': require('../../assets/img/Marketing.jpg'),
        'description': 'Market your business to relevant customers for better growth.',
        'background-color': 'white',
        'color': '#333'
    },
    {
        'id': 2,
        'name': 'Website Builder',
        'path': require('../../assets/img/website generator.png'),
        'description': 'Just fill out a few forms and the website will be ready with your favorite template.',
        'background-color': '#FCEBD7',
        'color': "#333"
    },
    {
        'id': 3,
        'name': 'Advertisement',
        'path': require('../../assets/img/ads.jpg'),
        'description': 'Advertise your business on social media sites like Instagram, Facebook, etc.',
        'background-color': '#4F9A9D',
        'color': '#333'
    }
]
const ServicesTabs = () => {
    return <div>
        <BlockHeading>Services</BlockHeading>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',  // Stretch items to equal height
            width: '70%',
            margin: '50px auto',
        }}>
            {services?.map((data) => (
                <GetAnimation animateIn={"fadeInUp"} duration={1} key={data.id}>
                    <ListItemContainer key={data.id} style={{
                        backgroundColor: data['background-color'],
                        color: data['color']
                    }}>
                        <ListItemImage
                            loading={"lazy"}
                            src={data.path}
                            alt={data.name}
                        />
                        <ListItemInfo>
                            <h1>{data.name}</h1>
                            <p>{data.description}</p>
                        </ListItemInfo>
                    </ListItemContainer>
                </GetAnimation>
            ))}
        </div>
    </div>
}

export default ServicesTabs;
