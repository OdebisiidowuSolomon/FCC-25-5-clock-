function Button(props) {
    return (
      <div id={props.id} className='Button' onClick={() => props.onChange(props.name)}>
        {props.name === '*' ? 'X' : props.name}
      </div>
    );
  }
  
export default Button;