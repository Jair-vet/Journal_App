 
// exports const myAction = async ({ commit }) => {

// }
import journalApi from "@/api/journalApi"
   
// ! CARGAR
export const loadEntries = async ({ commit }) => {
  
    const { data } = await journalApi.get('/entries.json')

    if( !data ){
        commit('setEntries', [])
        return 
    }

    const entries = []
    for( let id of Object.keys( data ) ){
        entries.push({
            id,
            ...data[id]
        })
    }

    commit('setEntries', entries)
}

//  ! UPDATE
export const updateEntry = async ({ commit }, entry) => {
    
    // Extraer unicamente lo ue necesitamos
    const { date, picture, text } = entry
    const dataToSave = { date, picture, text }

    // Mando llamar la peticion
    const resp = await journalApi.put( `/entries/${ entry.id }.json`, dataToSave )
    console.log(resp);

    // Commmit de una mutacion
    commit('updateEntry', { ...entry })


}

// ! CREATE
export const createEntry = async ({ commit }, entry) => {
  
    // Extraer los datos que necesitamos
    const { date, picture, text } = entry
    const dataToSave = { date, picture, text }

    // Mando llamar la peticion
    const { data } = await journalApi.post( `/entries.json`, dataToSave )
    
    dataToSave.id = data.name

    // Commmit de una mutacion
    commit('addEntry', dataToSave)

    return data.name
}

// ! DELETE
export const deleteEntry = async ({ commit }, id) => {
    await journalApi.delete( `/entries/${ id }.json`)
   
     // Commmit de una mutacion
     commit('deleteEntry', id)
     return id
}



