
export const updateEntry = (source, entry, selector = "id") => {
    return source.map(item => {
        if(item[selector] === entry[selector]){
            return entry
        } else {
            return item;
        }
    })
}

export const keysToJSON = async (keys, langs,) => {
    let locales = {};
    
    for (const {locale} of langs) {
        locales[locale] = {}
    }
    
    for (const {key, translations} of keys) {
        for (const {locale, text} of translations) {
            locales[locale.locale] = {
                ...locales[locale.locale],
                [key]: text
            }
        }
    }

  
    return locales

}   