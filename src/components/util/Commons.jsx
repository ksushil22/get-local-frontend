import {PUBLIC_BUSINESS_API} from "../../redux/api_url";

export const MainHeadingStyle= {
    fontWeight: 'bolder',
    fontSize: '2.5em',
    paddingLeft: '30px',
    color: '#605f5f',
    margin: 0
}

export function formatPhoneNumber(phoneNumber) {
    phoneNumber = phoneNumber?.replace(/\D/g, '');

    // Extract area code, first three digits, and last four digits
    const areaCode = phoneNumber?.slice(0, 3);
    const firstPart = phoneNumber?.slice(3, 6);
    const secondPart = phoneNumber?.slice(6);

    // Format and return the phone number
    return `(${areaCode}) ${firstPart}-${secondPart}`;
}

export function getMapUrl(address) {
    const formattedAddress = encodeURIComponent(address)
    return `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
}

export function getImageUrl(businessId, imageId) {
    const BASE_URL = process.env.BASE_API_URL;
    return `${BASE_URL}${PUBLIC_BUSINESS_API}${businessId}/image/${imageId}/`
}

export function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    console.log("going to ", sectionId)
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}
