import React, { Component } from 'react'
import PageContext from '../../container/PageContext'
import Page from '../../components/Page'
import Menu from '../../Menu'
import PortfolioTable from '../../components/PortfolioTable'
import PortfolioKPI from '../../components/PortfolioKPI'
import PortfolioComposition from '../../components/PortfolioComposition'

class Portfolio extends Component {
  render() {
    return (
      <PageContext>
        <Page pageName={<span className="title-name">My portfolio</span>}
              user={'Ruixin'}
              menu={<Menu/>}>
          <PortfolioKPI/>
          <PortfolioComposition/>
          <PortfolioTable/>
        </Page>

      </PageContext>
    )
  }
}

export default Portfolio
