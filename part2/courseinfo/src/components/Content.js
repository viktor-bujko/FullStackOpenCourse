import Part from './Part'

const Content = ({ contentParts }) => {
    console.log('contentParts: ', contentParts)
    return (
        <div>
            {contentParts.map(part => <Part key={part.id} part={part}/> )}
        </div>
    )
}

export default Content