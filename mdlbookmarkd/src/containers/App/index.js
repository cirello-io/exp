import React from 'react'
import MaterialIcon from '@material/react-material-icon'
import TopAppBar, { TopAppBarFixedAdjust, TopAppBarIcon, TopAppBarRow, TopAppBarSection, TopAppBarTitle } from '@material/react-top-app-bar'
import Drawer, { DrawerContent, DrawerAppContent } from '@material/react-drawer'
import List, { ListItem, ListItemText, ListItemGraphic, ListItemMeta } from '@material/react-list'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import HomePage from '../HomePage'
import PostPage from '../PostPage'
import './style.scss'
import LinearProgress from '@material/react-linear-progress';
import { folderByName } from '../../helpers/folders'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      selectedIndex: props.selectedIndex,
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(selectedIndex) {
    this.setState({ open: false }, () => {
      this.props.dispatch({ type: 'SELECT_BOOKMARK_FOLDER', selectedIndex: selectedIndex })
    })
  }

  render() {
    const drawer = <Drawer
      modal
      open={this.state.open}
      onClose={() => this.setState({ open: false })}
    >
      <DrawerContent>
        <List
          singleSelection
          selectedIndex={this.state.selectedIndex}
          handleSelect={this.handleSelect}
        >
          <ListItem>
            <ListItemGraphic graphic={<MaterialIcon icon='bookmark' />} />
            <ListItemText primaryText='Bookmarks' />
            <ListItemMeta meta={<span>{this.props.bookmarkCount}</span>} />
          </ListItem>
          <ListItem>
            <ListItemGraphic graphic={<MaterialIcon icon='all_inbox' />} />
            <ListItemText primaryText='Pending' />
            <ListItemMeta meta={<span>{this.props.pendingCount}</span>} />
          </ListItem>
          <ListItem>
            <ListItemGraphic graphic={<MaterialIcon icon='compare_arrows' />} />
            <ListItemText primaryText='Duplicated' />
            <ListItemMeta meta={<span>{this.props.duplicatedCount}</span>} />
          </ListItem>
          <ListItem>
            <ListItemGraphic graphic={<MaterialIcon icon='bookmarks' />} />
            <ListItemText primaryText='All' />
            <ListItemMeta meta={<span>{this.props.totalCount}</span>} />
          </ListItem>
        </List>
      </DrawerContent>
    </Drawer>

    return (
      <div className='drawer-container'>
        <TopAppBar fixed>
          <TopAppBarRow>
            <TopAppBarSection align='start'>
              <TopAppBarIcon navIcon tabIndex={0}>
                <MaterialIcon hasRipple icon='menu' onClick={
                  () => this.setState({ open: !this.state.open })
                } />
              </TopAppBarIcon>
              <TopAppBarTitle>Bookmarks Manager</TopAppBarTitle>
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
        <TopAppBarFixedAdjust className='top-app-bar-fix-adjust'>
          {drawer}
          <DrawerAppContent className='drawer-app-content'>
            {!this.props.loaded ? <LinearProgress indeterminate /> : null}
            <div>{this.props.linkAdded}</div>

            <Route exact path='/' component={HomePage} />
            <Route path='/post' component={PostPage} />

          </DrawerAppContent>
        </TopAppBarFixedAdjust>
      </div>
    );
  }
}

export default withRouter(connect(
  (state) => {
    return {
      loaded: state.bookmarks.loaded,
      bookmarkCount: state.bookmarks.loaded
        ? folderByName('bookmarks').filter(state.bookmarks.bookmarks).length
        : 0,
      pendingCount: state.bookmarks.loaded
        ? folderByName('pending').filter(state.bookmarks.bookmarks).length > 0
          ? folderByName('pending').filter(state.bookmarks.bookmarks).length
          : ''
        : '',
      totalCount: state.bookmarks.loaded
        ? folderByName('all').filter(state.bookmarks.bookmarks).length
        : 0,
      duplicatedCount: state.bookmarks.loaded
        ? folderByName('duplicated').filter(state.bookmarks.bookmarks).length > 0
          ? folderByName('duplicated').filter(state.bookmarks.bookmarks).length
          : ''
        : ''
    }
  }, null)(App))
