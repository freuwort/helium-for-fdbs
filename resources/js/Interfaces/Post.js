export default class Post
{
    _item
    _visualDictionary = {
        'blog': { id: 'blog', icon: 'public', color: '#1e90ff', tooltip: 'Blog' },
        'wiki': { id: 'wiki', icon: 'travel_explore', color: '#ff6348', tooltip: 'Wiki' },
        'intranet': { id: 'intranet', icon: 'policy', color: '#8854d0', tooltip: 'Intranet' },
        'jobs': { id: 'jobs', icon: 'work', color: '#e00047', tooltip: 'Karriere' },
        'unknown': { id: 'unknown', icon: 'help', color: 'var(--color-text)', tooltip: 'Unbekannt' },
    }
    _statusDictionary = {
        'draft': { id: 'draft', icon: 'draft', color: 'var(--color-text)', tooltip: 'Entwurf' },
        'pending': { id: 'pending', icon: 'forum', color: 'var(--color-yellow)', tooltip: 'Zur Freigabe' },
        'published': { id: 'published', icon: 'public', color: 'var(--color-green)', tooltip: 'Veröffentlicht' },
        'hidden': { id: 'hidden', icon: 'visibility_off', color: 'var(--color-red)', tooltip: 'Versteckt' },
        'unknown': { id: 'unknown', icon: 'help', color: 'var(--color-text)', tooltip: 'Unbekannt' },
    }

    constructor (item)
    {
        this._item = item || {}
    }
    
    get id ()
    {
        return this._item?.id
    }

    get name ()
    {
        return this._item?.title
    }

    get slug ()
    {
        return this._item?.slug
    }

    get scope ()
    {
        return this._item?.scope
    }

    get image ()
    {
        return this._item?.image
    }

    get displayMetadata ()
    {
        return {
            texts: [
                (this._item?.category?.name || 'Keine Kategorie'),
            ],

            icons: [
                (this._statusDictionary[this._item?.status] || this._statusDictionary['unknown']),
            ],
        }
    }

    get displayVisual ()
    {
        return this._visualDictionary[this._item?.scope] || this._visualDictionary['unknown']
    }

    get displayActions ()
    {
        return [
            [
                { id: 'open', icon: 'visibility', tooltip: 'Details', color: 'var(--color-text)', action: 'open' },
                // { id: 'duplicate', icon: 'content_copy', tooltip: 'Duplizieren', color: 'var(--color-text)', action: 'duplicate' },
            ],
            // [
            //     { id: 'delete', icon: 'delete', tooltip: 'Löschen', color: 'var(--color-error)', action: 'delete' },
            // ]
        ]
    }
}