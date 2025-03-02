import './index.css'

const SkillsList = props => {
  const {eachSkillDetails} = props
  const {name, imageUrl} = eachSkillDetails
  return (
    <li className="eachSkill">
      <img alt={name} className="eachImageIcon" src={imageUrl} />
      <p>{name}</p>
    </li>
  )
}

export default SkillsList
