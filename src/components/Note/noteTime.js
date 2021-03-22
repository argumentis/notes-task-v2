import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles(() => ({
  timeStyle: {
    display: 'flex',
    justifyContent: 'center',
    color: '#bababa',
    marginTop: '20px'
  }
}))

export default function NoteTime (props) {
  const classes = useStyles()
  const { itemTime } = props

  return (
    <div className={classes.timeStyle}>
      {itemTime}
    </div>
  )
}

NoteTime.propTypes = {
  itemTime: PropTypes.string.isRequired
}
