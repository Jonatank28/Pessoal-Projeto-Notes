import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const TogleThemes = ({ className, ...props }) => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    function HandleClickTheme() {
        if (theme === 'dark') {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }

    useEffect(() => {
        setMounted(true)
    })

    if (!mounted) {
        return null
    }

    return (
        <>
            <button onClick={HandleClickTheme} className={className} {...props}>
                {theme === 'dark' ? '🌞' : '🌙'}
            </button>
        </>
    )
}

export default TogleThemes
