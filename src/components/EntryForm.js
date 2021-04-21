import React, { useContext, useState, useEffect } from "react"
import { EntryContext } from "./EntryProvider"
import { MoodContext } from "./mood/MoodProvider"


export const EntryForm = (props) => {
    const { addEntry, updateEntry, entry, setEntry } = useContext(EntryContext)
    const { moods, getMoods, tags, getTags } = useContext(MoodContext)

    const [editMode, editModeChanged] = useState(false)

    useEffect(() => {
        getMoods().then(getTags)
    }, [])

    useEffect(() => {
        if ('id' in entry) {
            editModeChanged(true)
        }
        else {
            editModeChanged(false)
        }
    }, [entry])

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newEntry = Object.assign({}, entry)
        if(!newEntry.tags){
            newEntry.tags = []
        }
        if(event.target.name === "check"){
            console.log(event.target.value)
            let deletedTag = false
            newEntry.tags.forEach(t => {
                if(t === parseInt(event.target.value)){
                    newEntry.tags.splice(newEntry.tags.indexOf(t),1)
                    deletedTag = true
                }
                })
            if(!deletedTag){
                newEntry.tags.push(parseInt(event.target.value))
            }
        }else{
            newEntry[event.target.name] = event.target.value
        }
        console.log(newEntry)
        setEntry(newEntry)
    }



    const constructNewEntry = () => {

        if (editMode) {
            updateEntry({
                id: entry.id,
                concept: entry.concept,
                entry: entry.entry,
                date: entry.date,
                mood_id: parseInt(entry.mood_id),
                tags : entry.tags
            })
        } else {   
            addEntry({
                concept: entry.concept,
                entry: entry.entry,
                date: new Date().toISOString().slice(0, 10),
                mood_id: parseInt(entry.mood_id),
                tags : entry.tags
            })
        }
        setEntry({ concept: "", entry: "", mood_id: 0, tags: [] })
    }

    return (
        <form className="EntryForm">
            <h2 className="EntryForm__title">{editMode ? "Update Entry" : "Create Entry"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="concept">Concept: </label>
                    <input type="text" name="concept" required autoFocus className="form-control"
                        proptype="varchar"
                        placeholder="Concept"
                        value={entry.concept}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="entry">Entry: </label>
                    <input type="text" name="entry" required className="form-control"
                        proptype="varchar"
                        placeholder="Entry"
                        value={entry.entry}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="mood_id">Mood: </label>
                    <select name="mood_id" className="form-control"
                        proptype="int"
                        value={entry.mood_id}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select a mood</option>
                        {moods.map(m => (
                            <option key={m.id} value={m.id}>
                                {m.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    {tags.map(t =>
                        <>
                            <label htmlFor={t.name}>{t.name}</label>
                            <input name="check" type="checkbox" id={t.id} onChange={handleControlledInputChange} checked={entry.tags?.includes(t.id)} value= {t.id}/>
                        </>
                    )}
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewEntry()
                }}
                className="btn btn-primary">
                {editMode ? "Update" : "Save"}
            </button>
        </form>
    )
}