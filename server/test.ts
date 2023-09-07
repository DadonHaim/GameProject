import Test from "./Tests/Test"

require('module-alias/register')

Test.DeleteTestDB();
Test.CreateTestDB();

require("@Tests/RegisterTest")
require("@Tests/ILoginTest")

Test.DeleteTestDB();

