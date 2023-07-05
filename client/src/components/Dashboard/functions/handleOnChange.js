export default function handleOnChange(e, setState) {
    setState(prev => ({
        ...prev,
        [e.target.name]: e.target.value
    }))
}