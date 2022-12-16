export const STATIC_HOST = 'https://api.ezfrontend.com';
export const THUMBNAIL_PLACEHOLDER = 'https://placehold.jp/400x400.png';
export const GRAY_COLOR = '#ced4da';
export const ACTIVE_COLOR = 'rgba(27, 168, 255, 0.1)';
export const YELLOW_COLOR = '#FEBD17';

export const numberToVND = (number) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(number)
}