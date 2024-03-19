
import testhandler from '@/actions/upload';



export default  async function UploadPage() {
 
 
 
 // const userId= "user_2dulLgIkcll1k6ynoWl1iLf8nC4";

  return (
    <form action={testhandler}>
      <input type="text" name='testname'  placeholder="Test Name" />
      <input type="file"  name='file'/>
      <button type="submit">Upload</button>
    </form>
  );
}