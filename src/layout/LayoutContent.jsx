import TogleThemes from '@/themes/TogleThemes'

const LayoutContent = ({ children }) => {
    return (
        <>
            <TogleThemes className="absolute top-3 right-4" />
            {children}
        </>
    )
}

export default LayoutContent
