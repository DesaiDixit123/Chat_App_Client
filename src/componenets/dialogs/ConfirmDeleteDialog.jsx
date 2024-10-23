import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

const ConfirmDeleteDialog = ({open,handlerClose,deleteHandler}) => {
  return (
      <Dialog open={open} onClose={handlerClose}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
              <DialogContentText>
                  Are you sure you want to delete this group?
              </DialogContentText>
          </DialogContent>
          <DialogActions>
              <Button onClick={handlerClose}>
                  No
            </Button>
              <Button color="error" onClick={deleteHandler}>
                  Yes
            </Button>
          </DialogActions>
   </Dialog>
  )
}

export default ConfirmDeleteDialog
