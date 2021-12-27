export const DAYS_MONTH_YEARS_OPTIONS = [
    { value: 1, label: 'Day(s)' },
    { value: 2, label: 'Month(s)' },
    { value: 3, label: 'Year(s)' }
];

export const TYPE_OF_ASSET_OPTIONS = [
    { key: 1, value: 'House', label: 'House' },
    { key: 2, value: 'Appartment', label: 'Appartment' },
    { key: 3, value: 'Store', label: 'Store' },
    { key: 4, value: 'Koddon', label: 'Koddon' },
    { key: 5, value: 'Land', label: 'Land' }
];

export const ASSET_LENGTH_WIDTH_OPTIONS = [
    { key: 1, value: 'sq.ft.', label: 'sq.ft.' },
    { key: 2, value: 'sq.yards', label: 'sq.yards' },
    { key: 3, value: 'sq.m.', label: 'sq.m.' },
    { key: 4, value: 'grounds', label: 'grounds' },
    { key: 5, value: 'aankadam', label: 'aankadam' },
    { key: 6, value: 'rood', label: 'rood' },
    { key: 7, value: 'chataks', label: 'chataks' },
    { key: 8, value: 'perch', label: 'perch' },
    { key: 9, value: 'guntha', label: 'guntha' },
    { key: 10, value: 'ares', label: 'ares' },
    { key: 11, value: 'biswa', label: 'biswa' },
    { key: 12, value: 'acres', label: 'acres' },
    { key: 13, value: 'bigha', label: 'bigha' },
    { key: 14, value: 'kottah', label: 'kottah' },
    { key: 15, value: 'hectares', label: 'hectares' },
    { key: 16, value: 'marla', label: 'marla' },
    { key: 17, value: 'kanal', label: 'kanal' },
    { key: 18, value: 'cents', label: 'cents' }
];

export const SHOW_MY_ASSET_FOR_TENANTS_OPTIONS = [
    { key: 1, value: 'Show', label: 'Show' },
    { key: 2, value: 'Hide', label: 'Hide' }
];

export const ASSET_FOR_OPTIONS = [
    { key: 1, value: 'Rent', label: 'Rent' },
    { key: 2, value: 'Lease', label: 'Lease' },
    { key: 3, value: 'Sale', label: 'Sale' }
];

export const CITY_OPTIONS = [
    { value: 1, label: 'Muthialpet' },
    { value: 2, label: 'Mudaliyarpet' },
    { value: 3, label: 'Villianur' },
    { value: 4, label: 'yanam' }
];

export const STATE_OPTIONS = [
    { value: 1, label: 'Puducherry' },
    { value: 2, label: 'Tamilnadu' }
];

export const WHO_CAN_CONTACT_OPTIONS = [
    { value: 1, label: 'Bachelor' },
    { value: 2, label: 'Single Person' },
    { value: 3, label: 'Family' },
    { value: 4, label: 'Anyone' }
];

export const ASSET_STATUS_NOW_OPTIONS = [
    { value: 1, label: 'Free(available)' },
    { value: 2, label: 'Booked(unavailable)' },
    { value: 3, label: 'Tenant on notice period' },
    { value: 4, label: 'Asset under maintenance' }
];

export const LIKE_OR_DISLIKE_OPTIONS = [
    { value: 1, label: 'Like' },
    { value: 2, label: 'Dislike' }
];

export const IS_PROPOSAL_CANCELLED_OPTIONS = [
    { value: 1, label: 'Not Cancelled' },
    { value: 2, label: 'Cancelled' }
];

export const BULK_DATA_INSERT_TYPES = [
    { value: 1, label: 'City Options' },
    { value: 2, label: 'State Options' },
    { value: 3, label: 'Who Can Contact Options' }
];

export const CUSTOM_STYLES = {
    singleValue: (provided, state) => {
      const color = state.selectProps.isLoading ? 'white' : 'black';
      return { ...provided, color };
    },
    valueContainer: (provided, state) => {
        const color = state.selectProps.isLoading ? 'white' : 'black';
        return { ...provided, color };
      }
}

export const ENABLE_DISABLE_FILTER = [
    { key: 1, value: 1, label: 'Enabled' },
    { key: 2, value: 2, label: 'Disabled' }
];

export const ERROR_RESPONSE = { status: 'error', message: 'Something went wrong.'}

export const CUSTOM_ERRORS = ['Not authorized, token failed', 'Not authorized, no token'];