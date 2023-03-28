import classNames from 'classnames'

export type ButtonProps = {
  text: string
  background?: 'red' | 'white' | 'green'
}

const Button = ({text, background = 'white'}: ButtonProps) => {
  const classes = classNames({
    'bg-red-200': background === 'red',
    'bg-gray-200': background === 'white',
    'bg-green-200': background === 'green',
  })

  return (
    <button
      type="button"
      className={`${classes} rounded-full border-4 border-gray-600 px-4 py-2`}
    >
      {text}
    </button>
  )
}

export default Button
