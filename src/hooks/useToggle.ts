import React from 'react';

const useToggle = (initialState?: boolean) => {
    const [value, setValue] = React.useState(initialState);
    const toggleValue = () => setValue(oldValue => !oldValue);

    return [value, toggleValue] as [boolean, () => void];
}

export default useToggle;