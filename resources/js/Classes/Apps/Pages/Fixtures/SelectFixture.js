import Fixture from '@/Classes/Apps/Pages/Fixtures/Fixture.js'



export default class SelectFixture extends Fixture
{
    constructor(label)
    {
        super()

        this.label = label
        this.type = 'select'
        this.options = []
        this._value = null

        return this
    }



    get value()
    {
        return this._value
    }

    set value(value)
    {
        this._value = value
        this.onChange()
    }



    serializeValue()
    {
        return this._value
    }



    setOptions(options)
    {
        this.options = options

        return this
    }
}