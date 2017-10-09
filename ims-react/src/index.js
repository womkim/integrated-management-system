import React from 'react'
import { render } from 'react-dom'
import registerServiceWorker from './registerServiceWorker'

render(<h3>Hello world</h3>, document.getElementById('root'))
registerServiceWorker()
