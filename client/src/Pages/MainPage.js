import React, { useEffect } from 'react'
import ProtectedPage from './ProtectedPage'

export default () => {

    useEffect(() => {
        console.log('some common code that runs for protected route goes here....')
    }, [])

    return <ProtectedPage>
        <div>This is the main page</div>
    </ProtectedPage>
}