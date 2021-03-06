USE [master]
GO
/****** Object:  Database [NominaEntityFramework]    Script Date: 06/27/2018 22:23:32 ******/
CREATE DATABASE [NominaEntityFramework] ON  PRIMARY 
( NAME = N'NominaEntityFramework', FILENAME = N'/var/opt/mssql/data/NominaEntityFramework.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'NominaEntityFramework_log', FILENAME = N'/var/opt/mssql/data/NominaEntityFramework_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [NominaEntityFramework].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [NominaEntityFramework] SET ANSI_NULL_DEFAULT OFF
GO
ALTER DATABASE [NominaEntityFramework] SET ANSI_NULLS OFF
GO
ALTER DATABASE [NominaEntityFramework] SET ANSI_PADDING OFF
GO
ALTER DATABASE [NominaEntityFramework] SET ANSI_WARNINGS OFF
GO
ALTER DATABASE [NominaEntityFramework] SET ARITHABORT OFF
GO
ALTER DATABASE [NominaEntityFramework] SET AUTO_CLOSE ON
GO
ALTER DATABASE [NominaEntityFramework] SET AUTO_CREATE_STATISTICS ON
GO
ALTER DATABASE [NominaEntityFramework] SET AUTO_SHRINK OFF
GO
ALTER DATABASE [NominaEntityFramework] SET AUTO_UPDATE_STATISTICS ON
GO
ALTER DATABASE [NominaEntityFramework] SET CURSOR_CLOSE_ON_COMMIT OFF
GO
ALTER DATABASE [NominaEntityFramework] SET CURSOR_DEFAULT  GLOBAL
GO
ALTER DATABASE [NominaEntityFramework] SET CONCAT_NULL_YIELDS_NULL OFF
GO
ALTER DATABASE [NominaEntityFramework] SET NUMERIC_ROUNDABORT OFF
GO
ALTER DATABASE [NominaEntityFramework] SET QUOTED_IDENTIFIER OFF
GO
ALTER DATABASE [NominaEntityFramework] SET RECURSIVE_TRIGGERS OFF
GO
ALTER DATABASE [NominaEntityFramework] SET  ENABLE_BROKER
GO
ALTER DATABASE [NominaEntityFramework] SET AUTO_UPDATE_STATISTICS_ASYNC OFF
GO
ALTER DATABASE [NominaEntityFramework] SET DATE_CORRELATION_OPTIMIZATION OFF
GO
ALTER DATABASE [NominaEntityFramework] SET TRUSTWORTHY OFF
GO
ALTER DATABASE [NominaEntityFramework] SET ALLOW_SNAPSHOT_ISOLATION OFF
GO
ALTER DATABASE [NominaEntityFramework] SET PARAMETERIZATION SIMPLE
GO
ALTER DATABASE [NominaEntityFramework] SET READ_COMMITTED_SNAPSHOT OFF
GO
ALTER DATABASE [NominaEntityFramework] SET HONOR_BROKER_PRIORITY OFF
GO
ALTER DATABASE [NominaEntityFramework] SET  READ_WRITE
GO
ALTER DATABASE [NominaEntityFramework] SET RECOVERY FULL
GO
ALTER DATABASE [NominaEntityFramework] SET  MULTI_USER
GO
ALTER DATABASE [NominaEntityFramework] SET PAGE_VERIFY CHECKSUM
GO
ALTER DATABASE [NominaEntityFramework] SET DB_CHAINING OFF
GO
USE [NominaEntityFramework]
GO
/****** Object:  Table [dbo].[__MigrationHistory]    Script Date: 06/27/2018 22:23:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[__MigrationHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ContextKey] [nvarchar](300) NOT NULL,
	[Model] [varbinary](max) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK_dbo.__MigrationHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC,
	[ContextKey] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[__MigrationHistory] ([MigrationId], [ContextKey], [Model], [ProductVersion]) VALUES (N'201806270100218_AutomaticMigration', N'ExamenNomina.Migrations.Configuration', 0x1F8B0800000000000400CD58CD6EE33610BE17E83B083C67CD38B96C037917592769D3AE1323CA2E7AA5A5B143942255920AEC67EBA18FD457E850BFB42427F6D65914BE48D4CC373F9CF938F43F7FFD1D7E5CA72278066DB89213321E9D920064AC122E571392DBE5BBF7E4E3871F7F08AF93741D7CADE5CE9D1C6A4A33214FD66617949AF809526646298FB5326A6947B14A294B143D3B3DFD898EC7141082205610840FB9B43C85E2055FA74AC690D99C89994A40986A1DBF44056A70C75230198B6142AED7F82CEF54CA251BCD98642BD024B8149CA12F118825099894CA328B9E5E7C311059ADE42ACA708189C74D0628B764C24015C1452BBE6F30A7672E18DA2AD650716EAC4A0F041C9F57D9A15DF56FCA3169B287F9BBC63CDB8D8BBAC8E1844C997D5002CC759A09404D4382AED58BA9D04EA39BEB626B463D8093C0173B698A046BC9FD4E82692E6CAE612221B79A8993609E2F048F7F83CDA3FA03E444E642F84EA3DBF86D6B0197E65A65A0EDE601965528B70909E8B61EED2A366A9E4E19DBADB4E76724B843E36C21A0A9092F0F91551A7E06099A5948E6CC5AD0D2614091D59EF58EAD2B30B1E6595C6C6469146B111B8B0433B6FE0C72659F2604778E04377C0D49BD5239F24572EC4354B23A8701475F363E672BF5FB2F4AB3DAF415C43C658204738D4F55BBBF27411433073A948A3D2C607D6958BD9D914F4ABE7118BF2A2D59F276F88F3C53AFD59C8F10D2B667FB9D8C4C6919C78AAC6B8C59E6D6606D071A19D9AFEA655395D1B6AB256604763739B4CE94ECDAEFFF61F71B475B2EA72599D7A44F77B07E386359865DE29D02D54A109547C0F45D743833A625068DCD004136DE3696B0F5F164E97C45D3E8E90DD7C6BAC42F98DBBC6992F6C4FC6DD991F2DAD2AECC77F9AFDD885AD33D97DA4367E2C0467520DBC4DE60AC08608BB0A171710FB70A14D71B4C0F30ED54893C95BBD8FA25ED2DEEF461B63EEC8FE7D1A18FE62D1F88D5105F0FAEF9B23FA2C7723E9CB7BC3F56C3673E52B3B83F4EC95B3E48B9D2470869A78CBAA54B7BB5DB39B5BB4DF1129F74451AEB0DAF74F823AC7AF9F5D1B2D7DCA5883B0BD4334F5C63471B63211D398151F4A7980A8EF1B602D87B7C09C696830D9EEDE3B3CE6CFAFF9913A93189387458FCEE631A77E97D75103BF04C1E98CCE433D3F113D3FDD9ECBF0E5EC9F718BC8E6EA437781DDD4267F03A3ABE3F78155574C4B1AB3F06BCC96055F20FE666E122297D3FDEFCD5E7C590FA17F310DB84AF5A08774D97103BC269416B995BB954F50660DCBE47B548677F666071FB2DBBD4962F596CF1730CC614F7A3AF4CE46EAE491790DCCAFBDC66B9BD3406D285D8BA7685F465FBC590B9ED73789FB937738C10D04D8E21C0BDFC947391347EDF0CD4D70E08574915B3A157783F44B8D5A641BA53724FA02A7D57908174BCF80858200866EE65C49EE15B7CC3EBC367E49878531F6FBB415EDF88EDB487579CAD344B4D85D1EABB3F9BA8FBB7E9C3BF35E84D8A9F120000, N'6.2.0-61023')
INSERT [dbo].[__MigrationHistory] ([MigrationId], [ContextKey], [Model], [ProductVersion]) VALUES (N'201806270114306_AutomaticMigration', N'ExamenNomina.Migrations.Configuration', 0x1F8B0800000000000400ED5BDB6EE336107D2FD07F10F4D402592BC9BE6C037B17592769D3AE93204A167DA5A5B123542255920AEC6FEB433FA9BFD0A16EA66EB6644B417611E4C5E2E5CC7078869719E6BF7FFE1D7F5A05BEF10C5C788C4ECC93D1B169007598EBD1E5C48CE4E2DD07F3D3C71F7F185FBAC1CAF89AB57BAFDA614F2A26E69394E1996509E70902224681E77026D8428E1C1658C465D6E9F1F12FD6C9890508612296618CEF232ABD00E20FFC9C32EA402823E2CF980BBE48CBB1C68E518D1B128008890313F37285BFE90D0B3C4A463342C912B8699CFB1E415D6CF017A64128659248D4F4EC51802D39A34B3BC402E23FAC43C0760BE20B484770B669DE7630C7A76A30D6A66306E54442B2A023E0C9FBD43A56B9FB5E363673EBA1FD2ED1CE72AD461DDB70624E89BC0C421FB093308DB2C0B3A9CF55E3B299E35919E97D8F0CBDC5514E0D6490FA3B32A6912F230E130A91E4C43F32EEA2B9EF397FC0FA81FD05744223DFD7554565B1AE508045779C85C0E5FA1E16E900AE5DD3B08AFDAC72C7BC9BD62719D63595EF4F4DE3068593B90F39133413D89271F815287022C1BD235202A70A03625B56A49764A141E61C3279483EF424D39891D517A04BF93431F1A7695C792B70B392548747EAA1E36127C923D825E69EF9BB47B51DE2C10B59378CB1B5E1530B967110644F92C55DDF38D620EB0284C3BDD0899788A189B670869701F25AF04CCC05385E407CD3B8E3F82BDD983E9886ED1065CD3D888E5F33A02252A003C9488670EE7A6A5206947381FBDC0C444FF85D1C7AC69EBDC043823271C80E5207F3E6E80DB2320B5D5F1CB6D45F81F34472CEA02A0F78FAEA8C82ACE0B0247D91AF2A601ACDB9C71E224E5926E333636801DADD1FD5FE98E00DB5C3A10838C8158A006F4ED020ABDD6E8727E0563B51471EDD9125FBF337C6C960A48F25A4AE359890CF8C0E3C8CDF19A7C41D0E5F9D5687F264857D90271701DE3CF9204FEEE74CD9952F5584AFC854D438C493635FB4DE4ECA29A3927868DCCC5C441255062B59C3C94701292D456A91E268124C1B64EDCD7FA34712351915ABAD3658E9FDAE012AADDD8D547FB0AC43AD6FB95B4279A7AEC32EB7D98D5A5E35EA50CB6DEAC8904FFB26EC652571AF2C3E663504C8C6331286E83E5AC02C2D31EC245A367D67770F22050986E5889A5852AE6D2E09D704B284522D8A464DAF3C2EA4A2F19C285798BA41A5994EF2069367926A785C5E133773907552BFD3E36B4DE470B40D6D63CE2B1C21F695F16021576CBB3231805A1808AF5973A7CC8F02DAB46E6FEB9D45987484ACAC3D4A1A40D241D2A2F61859044907C9CAAA2863AB64CDF2E45995D92BED65654674E04BB21AF544975AB0D66C69E83D0C590A5BAE0E53A8E8401B150E2A90461574E89F867A0A10695907E2E9119D02FBF48AAE5A69D19BAA7A5A6507EB67D19A82E5B3C2D7E422B55B6B1FEED206B89DEBB4431AC68DF4408C8EA297B7474BC3313A505AD441A33C1853D0272F6D8F5488BAE860858A8E3B4B167AA9EC2F59C56B227FE9ECD707EDB743B623FC2E8C6F63C7D022283A9A56DC112B8F9554E0F29AF6885A604487D38ADB63E521101D292FEC76ACAA1EAA5E97CB942E367DB8CC76C8762EB30BE3DB7099F604684228C62E74A462CD0B53AA72E52D37C9A5E757DFD215779C5E37773F14A9DC3F93262A7483070957DD3DEDB590108C548391FDB73FF5D5E962D300B9E92D40C82428679E1E9F9C965E9ABC9E571F9610AEDFE1E9C78B47173D65D99DF1C38E21BAE2630BFA4C389EA2F84F0159FDAC63757E50112B7BD0738ADD087B3DA6F83EA6AD260E7CD8DC6DDE281C86537887E0BEC03B84DE6534BC43E85D4EE91DC281F807BF43F83EFCA29AEEDF67212A24FB5DD44CF691ECEF9D4135C9FEB9D77DB43589FE7ED7DE6DB7B06F96695B56E06A56FDD09479EFD4A94B99F72EA49232EF5D422965DEFF7EA3A540FBF5896DD7ACEFD127F63A4D74337FBBFCF3A0FB6C39FF5CCDE0F598614E6E6338A2B93252A2F15039E866592F96A46E50E12533DA0D2ABC4CE2BB41784FF9F16A50606CE9FF6332463FF2961B08F51F27141C75DBDE80666DAEE98265AE88E3D635CA9A943C750612D77149CEB9F416C49158ED8010F1C316F4E2283EDACDC1BDA6B7910C23792E040473BFF05E666C6D971F3F0228EA3CBE0DD597E86308A8A6A7CE8AB7F473E4F96EAEF755CD22D200A1968B743946AD6CA996E5E53A47BA61B425506ABE0BC0A54F2DE60F80044130714B6DF20CFBE8F628E00B1E169C7516DB6906D93D1145B38FF12AB4E4241029C6A63F7E2287DD60F5F17F8918E93E6A350000, N'6.2.0-61023')
INSERT [dbo].[__MigrationHistory] ([MigrationId], [ContextKey], [Model], [ProductVersion]) VALUES (N'201806270213416_AutomaticMigration', N'ExamenNomina.Migrations.Configuration', 0x1F8B0800000000000400ED5CCD6EE33610BE17E83B083AB545364AB2976D60EF22EB246DDACD0FE2EC626F0B5AA21DA212A59254E0A0E893F5D047EA2B74284B3249519164CB8E7711E46253E437C3D137248733CE7FFFFC3B78378F42E701334E623A740FF70F5C07533F0E089D0DDD544C5FBD71DFBDFDFEBBC15910CD9D4F45BFD7B21F8CA47CE8DE0B911C7B1EF7EF7184F87E447C16F3782AF6FD38F250107B4707073F7B87871E060817B01C67709B5241229C7D81AFA398FA3811290A2FE300873C6F8727E30CD5B94211E609F2F1D03D9BC3677A154784A2FD4B44D10C33D7390909025DC6389CBA0EA234164880A6C71F391E0B16D3D938810614DE3D2618FA4D51C8713E83E365F7B69339389293F196030B283FE5228E3A021EBECEADE399C357B2B15B5A0FEC770676168F72D6990D87EE0889B32809310CE2AE630A3C1E854C7636CD9CBD957D75EC9EA3F6D82BA9010C927F7BCE280D45CAF090E2543014EE3937E92424FEEFF8F12EFE03D3214DC35055159485675A0334DDB038C14C3CDEE2693E818BC0753C7D9C670E2C87296316D3BAA0E2F591EB5C8170340971C904C504631133FC0BA6982181831B2404665462E0CC9615E9862C30C884E1421E900F3CC9752ED1FC03A633713F74E1A3EB9C93390E8A965C878F9480E3C120C152DC24E6360E9B67F534C41D49E2CE1857E881CC324355152AC8E13AB738CCFAF07B922CBC5223CF17ADF3398B236830C8A9F6F9328E53E64BA3C60D1DEF109B61D15E6B6983F66AEBBD6BF4563B3DADB8D6D3A6F9C05BFA6F93574B7CBE8E6BEB002FFE5D23EB14739F91C4CF96E75A2787F5B895937774D91B348B3FFF1A3354883EC53E8950E83A370C3EE59BF81BD719FB4882765F143209C02F86679B13F23EA61B9EC66F31A328D81CBE74DD2E2B67174F96D86B79B20EF0E2C96B79723FDB7557BE54113E015341E30453DE17ADBB9012E8C430472B9E19B3A12F44DC0122DE4EFDCDCBC0E282B3CDADBDF0ED12DC2095A01B92B198C24940E44BD9A09C53085B2F317F0687BE8C1F484480A0EBED3536981747AF915558E8E274BDBDE01CFBF7CB4D0054B92351F7C3647ECAEB8B7C5501A374C2487C97325AEE7DEF63883210EDEE8F32DC5DE0F571EC3AE13CF649F64E2DF7225A78AAAB754603A76DACBA5864CD2012D65B603F4980EFA0D8D0FDA932F516328A605197618680BAA043D774A06B7A8A432CB073E22F2EAB4688FB28A8BE0CB062A0B780CF6126498FC211C4CBE0C5848AAA8312EA9304852DA7638C6FE9E252BF5292F9E414C381497A67CBB7D64685FCEAA5AA4529CCB05E93B1069EC2C70E34D5AE235A71C87E37D13351ADD71ABA1033C4D969A6DAE6B36DAADA5E5C1B1D8A3BBE2D9075B1D2C2180123302B0E384820D986E7C272BAF8C8717EC0E0F9D1D26498C41C6361BDBD5EAEED56FA56D85AC132174C1BA0D9A719D524B70DD5ECD38CBA0CC06AA69D3F6D46B29FFC6CA8F69E8604850EF617A5DFF62ADD9B6E864DCE76D87CCB699B9CA9384287DD56076D2086A7DBA5ABCDF4ABE606A3D56F041DB782B5CD665DFB75D406EAD7DBAD38CC954BCC324DE82DF284453ED1AB49280E2E519240CCAB2418F31667BCC82E8E5E8DBB27DDA20586E7734BEEADD4B6940431049A61E32988064DCF09E3422E9913248FB2A320AA745317D41A572F2459D6CCEA6B2CBCBE18243FE7F18125D3BAFF14DAD29CE730C3486E6559C054C7AACAF02CE18B42C42C31DA280ED388D6EFACF5A38B8C9C8A50B4B547C94F7D2A48CD41B01EA3D88D5590BA1D5AD2D8B066650FAFBCBDCA614867445BBE184B5B1FA4791AB21D739A3036431FED764E85D11EB4C75372382A9AD2DC11ABCCD654E0CA27ED1195D48C0AA734B7C72A93302A52D9D8CD6DAA4EB35B2E63EC6A7DB8CCD390ED5CA609E3EB7099F604A843D0B3272A92FE649728559EE97BDAB4AD60ADF7EC9AD15F0781B2AC87B675CB860EE3F38C860691B775A0B19AB8D0D8AC3EE8AA9592A4A8AAA73CEC60FD2229A159BE68DC2517B106A87DB84B1BE076AED30E69336EA4E61B5414B5BD3D5A9E755081F2A60E1A9539074D9FB2B53D92965C50C1B4071DCFF74586A172CA2F1E6C99FC9590D7EC524A2F435F23C41DE4E16673616D25FE5C7491E920A0702063CFF1231738DA971DF6C77F86A350F27AD901FC874C31178B249E7B7470786454E6EE4E95ACC779105AC2F5BA52D9AD672389B46C63BEB1631A4D2F4EA50F8881FFB21F2234FF51C5EA5C809A295BB9DDBDA0019E0FDDBFB211C7CEC5E72FD9A03DE79A015B8E9D03E7EF358B56DBCA5D8CEA20788DCACB6F8329969A94822ED542C775AB18836D5431F62EA452C5D8BB04A38AB1777CB52A2D63D1A66A18BF799F586909ED66FEEA785B49E09A1C59A924F0E5EDDAF0944ABBF570B46ABAFED7806A355DEF326AAAE97A976354D36DD1179AA3BCAFD62FAA456BABAC555AC95A009A893E4AD67A6790A5646D42BACFD652AEB6FAFEDA4FB19A99AE7EB6D2317BE6788D32A4552B7C1A53521B2DE9F9364BCDCCE4FEB3957DED0CCB1AB338CFCFB2672F12AB963ED45C00AF5206B6B8C682BD6222D7E2C5EABB8D42B11AB9DBA927AB11BEB9B2B37A2B6FAD2EAD46855D2E62B3F3AA5D85D9138B5CCB32AE1DAD51B3F3BD5DF9D8468DD2A100AD7AEB0E8BA6F24F2F60D1E664B68490FF0283625F5B2ECB3E17741A17ABB6A151D1C5387F5E6281E0908D4E982053E40B78EC63CEB39F7B7D42619A1DEB2738B8A0D7A948520153C6D124D47EC02257FFA7E4675576BACE83EB24FBF97C1F530035898C13AEE9FB948441A9F7B9E5E05C0321B7953C1092EF52C88068F658225DC5B425506EBE7237BCC3C01E00E3D7748C1EF02ABA7DE4F8034432FE63913CA907697E11BAD9071006CF188A788EB11C0F5F81C341347FFB3FE0186289FB450000, N'6.2.0-61023')
/****** Object:  Table [dbo].[CatTiposEmpleados]    Script Date: 06/27/2018 22:23:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatTiposEmpleados](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](max) NULL,
	[Tipo] [int] NOT NULL,
	[ValeDespensa] [decimal](18, 2) NOT NULL,
 CONSTRAINT [PK_dbo.CatTiposEmpleados] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[CatTiposEmpleados] ON
INSERT [dbo].[CatTiposEmpleados] ([Id], [Descripcion], [Tipo], [ValeDespensa]) VALUES (1, N'Interno', 1, CAST(0.04 AS Decimal(18, 2)))
INSERT [dbo].[CatTiposEmpleados] ([Id], [Descripcion], [Tipo], [ValeDespensa]) VALUES (2, N'SubContratado', 2, CAST(0.00 AS Decimal(18, 2)))
SET IDENTITY_INSERT [dbo].[CatTiposEmpleados] OFF
/****** Object:  Table [dbo].[CatRolesEmpleados]    Script Date: 06/27/2018 22:23:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatRolesEmpleados](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](200) NOT NULL,
	[PagoXHora] [decimal](18, 2) NOT NULL,
	[PagoXEntrega] [decimal](18, 2) NOT NULL,
	[BonoXHora] [decimal](18, 2) NOT NULL,
	[Jornada] [decimal](18, 2) NOT NULL,
	[Tipo] [int] NOT NULL,
 CONSTRAINT [PK_dbo.CatRolesEmpleados] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[CatRolesEmpleados] ON
INSERT [dbo].[CatRolesEmpleados] ([Id], [Descripcion], [PagoXHora], [PagoXEntrega], [BonoXHora], [Jornada], [Tipo]) VALUES (1, N'Choferes', CAST(30.00 AS Decimal(18, 2)), CAST(5.00 AS Decimal(18, 2)), CAST(10.00 AS Decimal(18, 2)), CAST(8.00 AS Decimal(18, 2)), 1)
INSERT [dbo].[CatRolesEmpleados] ([Id], [Descripcion], [PagoXHora], [PagoXEntrega], [BonoXHora], [Jornada], [Tipo]) VALUES (2, N'Cargadores', CAST(30.00 AS Decimal(18, 2)), CAST(5.00 AS Decimal(18, 2)), CAST(5.00 AS Decimal(18, 2)), CAST(8.00 AS Decimal(18, 2)), 2)
INSERT [dbo].[CatRolesEmpleados] ([Id], [Descripcion], [PagoXHora], [PagoXEntrega], [BonoXHora], [Jornada], [Tipo]) VALUES (3, N'Auxiliares', CAST(30.00 AS Decimal(18, 2)), CAST(5.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(8.00 AS Decimal(18, 2)), 3)
SET IDENTITY_INSERT [dbo].[CatRolesEmpleados] OFF
/****** Object:  Table [dbo].[CatMovimientosEmpleados]    Script Date: 06/27/2018 22:23:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatMovimientosEmpleados](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[EmpleadoID] [int] NOT NULL,
	[Fecha] [datetime] NOT NULL,
	[Entregas] [decimal](18, 2) NOT NULL,
	[CubrioTurno] [bit] NOT NULL,
	[RolIdCubrio] [int] NOT NULL,
 CONSTRAINT [PK_dbo.CatMovimientosEmpleados] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[CatMovimientosEmpleados] ON
INSERT [dbo].[CatMovimientosEmpleados] ([Id], [EmpleadoID], [Fecha], [Entregas], [CubrioTurno], [RolIdCubrio]) VALUES (1, 2, CAST(0x0000A90C00000000 AS DateTime), CAST(10.00 AS Decimal(18, 2)), 0, 0)
INSERT [dbo].[CatMovimientosEmpleados] ([Id], [EmpleadoID], [Fecha], [Entregas], [CubrioTurno], [RolIdCubrio]) VALUES (2, 1, CAST(0x0000A90C00000000 AS DateTime), CAST(20.00 AS Decimal(18, 2)), 0, 0)
INSERT [dbo].[CatMovimientosEmpleados] ([Id], [EmpleadoID], [Fecha], [Entregas], [CubrioTurno], [RolIdCubrio]) VALUES (3, 3, CAST(0x0000A90C00000000 AS DateTime), CAST(10.00 AS Decimal(18, 2)), 1, 1)
INSERT [dbo].[CatMovimientosEmpleados] ([Id], [EmpleadoID], [Fecha], [Entregas], [CubrioTurno], [RolIdCubrio]) VALUES (4, 4, CAST(0x0000A90C00000000 AS DateTime), CAST(50.00 AS Decimal(18, 2)), 0, 0)
INSERT [dbo].[CatMovimientosEmpleados] ([Id], [EmpleadoID], [Fecha], [Entregas], [CubrioTurno], [RolIdCubrio]) VALUES (5, 5, CAST(0x0000A90C00000000 AS DateTime), CAST(50.00 AS Decimal(18, 2)), 0, 0)
INSERT [dbo].[CatMovimientosEmpleados] ([Id], [EmpleadoID], [Fecha], [Entregas], [CubrioTurno], [RolIdCubrio]) VALUES (6, 6, CAST(0x0000A90C00000000 AS DateTime), CAST(50.00 AS Decimal(18, 2)), 1, 2)
INSERT [dbo].[CatMovimientosEmpleados] ([Id], [EmpleadoID], [Fecha], [Entregas], [CubrioTurno], [RolIdCubrio]) VALUES (7, 1, CAST(0x0000A92B00000000 AS DateTime), CAST(200.00 AS Decimal(18, 2)), 0, 0)
INSERT [dbo].[CatMovimientosEmpleados] ([Id], [EmpleadoID], [Fecha], [Entregas], [CubrioTurno], [RolIdCubrio]) VALUES (8, 3, CAST(0x0000A90C00000000 AS DateTime), CAST(500.00 AS Decimal(18, 2)), 1, 1)
SET IDENTITY_INSERT [dbo].[CatMovimientosEmpleados] OFF
/****** Object:  Table [dbo].[CatEmpresas]    Script Date: 06/27/2018 22:23:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatEmpresas](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](max) NULL,
	[Rfc] [nvarchar](max) NULL,
	[RetIsr] [decimal](18, 2) NOT NULL,
	[TopeMensual] [decimal](18, 2) NOT NULL,
	[RetIsrAdicional] [decimal](18, 2) NOT NULL,
	[DiasMes] [decimal](18, 2) NOT NULL,
 CONSTRAINT [PK_dbo.CatEmpresas] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[CatEmpresas] ON
INSERT [dbo].[CatEmpresas] ([Id], [Descripcion], [Rfc], [RetIsr], [TopeMensual], [RetIsrAdicional], [DiasMes]) VALUES (1, N'Coppel', N'Coppel', CAST(0.09 AS Decimal(18, 2)), CAST(16000.00 AS Decimal(18, 2)), CAST(0.03 AS Decimal(18, 2)), CAST(30.00 AS Decimal(18, 2)))
SET IDENTITY_INSERT [dbo].[CatEmpresas] OFF
/****** Object:  Table [dbo].[CatEmpleados]    Script Date: 06/27/2018 22:23:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatEmpleados](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](max) NULL,
	[RolId] [int] NOT NULL,
	[TipoId] [int] NOT NULL,
 CONSTRAINT [PK_dbo.CatEmpleados] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_RolId] ON [dbo].[CatEmpleados] 
(
	[RolId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_TipoId] ON [dbo].[CatEmpleados] 
(
	[TipoId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[CatEmpleados] ON
INSERT [dbo].[CatEmpleados] ([Id], [Nombre], [RolId], [TipoId]) VALUES (1, N'ALFONSO MENDEZ OCHOA', 1, 1)
INSERT [dbo].[CatEmpleados] ([Id], [Nombre], [RolId], [TipoId]) VALUES (2, N'JOSE LOPEZ', 2, 1)
INSERT [dbo].[CatEmpleados] ([Id], [Nombre], [RolId], [TipoId]) VALUES (3, N'ANTONIO OCHOA', 3, 1)
INSERT [dbo].[CatEmpleados] ([Id], [Nombre], [RolId], [TipoId]) VALUES (4, N'PEDRO CASTRO', 1, 2)
INSERT [dbo].[CatEmpleados] ([Id], [Nombre], [RolId], [TipoId]) VALUES (5, N'LUIS MEZA', 2, 2)
INSERT [dbo].[CatEmpleados] ([Id], [Nombre], [RolId], [TipoId]) VALUES (6, N'JOSEFINA RENDON', 3, 2)
SET IDENTITY_INSERT [dbo].[CatEmpleados] OFF
/****** Object:  ForeignKey [FK_dbo.CatEmpleados_dbo.CatRolesEmpleados_RolId]    Script Date: 06/27/2018 22:23:37 ******/
ALTER TABLE [dbo].[CatEmpleados]  WITH CHECK ADD  CONSTRAINT [FK_dbo.CatEmpleados_dbo.CatRolesEmpleados_RolId] FOREIGN KEY([RolId])
REFERENCES [dbo].[CatRolesEmpleados] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CatEmpleados] CHECK CONSTRAINT [FK_dbo.CatEmpleados_dbo.CatRolesEmpleados_RolId]
GO
/****** Object:  ForeignKey [FK_dbo.CatEmpleados_dbo.CatTiposEmpleados_TipoId]    Script Date: 06/27/2018 22:23:37 ******/
ALTER TABLE [dbo].[CatEmpleados]  WITH CHECK ADD  CONSTRAINT [FK_dbo.CatEmpleados_dbo.CatTiposEmpleados_TipoId] FOREIGN KEY([TipoId])
REFERENCES [dbo].[CatTiposEmpleados] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CatEmpleados] CHECK CONSTRAINT [FK_dbo.CatEmpleados_dbo.CatTiposEmpleados_TipoId]
GO
