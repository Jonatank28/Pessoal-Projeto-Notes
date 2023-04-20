import TogleThemes from '@/themes/TogleThemes'

const LayoutContent = ({ children }) => {
    return (
        <>
            <TogleThemes className="absolute top-4 right-10" />
            {children}
        </>
    )
}

export default LayoutContent
