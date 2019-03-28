import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

const LoaderIcon = () => (
  <div>
    <Segment>
      <Dimmer active>
        <Loader>Loading</Loader>
      </Dimmer>
    </Segment>
    <Segment>
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    </Segment>
  </div>
)

export default LoaderIcon;