import React, { Component } from 'react'
import PageContext from '../../container/PageContext'
import Page from '../../components/Page'
import Menu from '../../Menu'
import SearchResultList from '../../components/SearchResultList'
import StockTitle from '../../components/StockTitle'
import StockOverview from '../../components/StockOverview'

class StockInfo extends Component {
  render() {
    return (
      <PageContext>
        <Page
          pageName={<StockTitle/>}
          user={'Ruixin'}
          menu={<Menu/>}
          appbar={<button className="btn primary">Buy</button>}
        >
          <StockOverview/>
        </Page>
      </PageContext>
    )
  }
}

export default StockInfo
