import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ course }) => {
    const name = course.name
    const parts = course.parts

    return (
        <>
            <Header headerTitle={name}/>
            <Content contentParts={parts}/>
            <Total parts={parts}/>
        </>
    )
}

export default Course