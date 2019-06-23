import { useState, useEffect } from 'react';

const useSnackbar = (path, push) => {
    const [state, setState] = useState({
        open: false,
        variant: '',
        message: '',
        transition: ''
    });
    useEffect(() => {
        if(state.open) {
            setTimeout(() => {
                setState({ ...state, open: false });
                push(path);
            }, 5000);
        }
    }, [state.open]);
    return [state, setState];
}

export default useSnackbar;