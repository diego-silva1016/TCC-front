const EmptyMessage = ({message}) => {
    return (
        <div style={{display: "flex", justifyContent: "center", padding: '12px'}}>
        <strong style={{fontSize: '20px'}}>{message}</strong>
      </div>
    )
}

export default EmptyMessage