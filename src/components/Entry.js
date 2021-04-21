import React, { useContext } from "react";
import { EntryContext } from "./EntryProvider";

export const Entry = ({ entry }) => {

  const { deleteEntry, getEntryById } = useContext(EntryContext)

  return (

    <section className="entry">
      <div className="entry__concept">{entry.concept}</div>
      <div className="entry__entry">{entry.entry}</div>
      <div className="entry__date">{entry.date}</div>
      <div className="entry__mood">{entry.mood.label}</div>
      <div className="entry_tags">Tags: {entry.tags.map(t => <p>{t.name}</p>)}</div>

      <button onClick={
        () => {
          deleteEntry(entry)
        }
      }>Delete</button>
      <button onClick={
        () => {
          getEntryById(entry.id)
        }
      }>Edit</button>
    </section>
  )
};
