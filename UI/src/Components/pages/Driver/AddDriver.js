import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../../common/Form/Form.css';
import '../../common/Tabs/Tabs.css';
import '../Driver/AddDriver.css'
import Bank from './Components/Bank';
import Contacts from './Components/Contacts';
import Details from './Components/Details';
import LicenceDetails from './Components/LicenceDetails';
import References from './Components/References';


function AddDriver() {
    return (
        <>
            <div className='tabs-sec'>
                <h2 className='mb-4'>Driver/ Create</h2>
                <Tabs
                    defaultActiveKey="details"
                    id="fill-tab-example"
                    fill
                >
                    <Tab eventKey="details" title="Details">
                        <Details />
                    </Tab>
                    <Tab eventKey="contact" title="Contacts">
                        <Contacts />
                    </Tab>
                    <Tab eventKey="licencedetails" title="Licence Details">
                        <LicenceDetails />
                    </Tab>
                    <Tab eventKey="references" title="References">
                        <References />
                    </Tab>
                    <Tab eventKey="bank" title="Bank">
                        <Bank />
                    </Tab>
                </Tabs>
            </div>
        </>
    );
}

export default AddDriver;