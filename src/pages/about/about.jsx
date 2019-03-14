import React, {Component} from 'react'

import FilterableProductTable from '@/components/FilterableProductTable.js'

export default class About extends Component {
    super(props) {

    }
    render() {
        return (
            <div>
                <h2>about</h2>
                <FilterableProductTable />
            </div>

            )
    }
}